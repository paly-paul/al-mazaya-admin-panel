import { API_BASE } from './config'

async function apiFetch(path: string, options?: RequestInit) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('mazaya_admin_token') : null
  const headers = new Headers(options?.headers)
  headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  const body = await res.json().catch(() => null)

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mazaya_admin_token')
      window.location.href = '/login'
    }
    throw new Error('Unauthorized')
  }

  if (!res.ok) {
    const message = body?.detail || body?.error || `Request failed with status ${res.status}`
    throw new Error(message)
  }

  if (body && typeof body === 'object' && 'success' in body && 'data' in body) {
    return body.data
  }

  return body
}

export const api = {
  get: (path: string) => apiFetch(path),
  post: (path: string, body: unknown) => apiFetch(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: (path: string, body: unknown) => apiFetch(path, { method: 'PATCH', body: JSON.stringify(body) }),
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('mazaya_admin_token')
}
