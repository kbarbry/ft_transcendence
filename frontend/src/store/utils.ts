export async function validateAvatarUrl(
  avatarUrl: string | null | undefined
): Promise<string | undefined> {
  if (!avatarUrl) return
  let validatedUrl = avatarUrl

  try {
    const response = await fetch(validatedUrl)
    const contentType = response.headers.get('Content-Type')

    if (!response.ok || (contentType && !contentType.startsWith('image/'))) {
      return
    }
  } catch (e) {
    return
  }

  return validatedUrl
}
