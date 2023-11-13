import { ELanguage, User } from '@prisma/client'

export enum EStrategy {
  local = 'local',
  github = 'github',
  google = 'google',
  school42 = 'school42'
}

type LanguageName = {
  French: string
  English: string
  Spanish: string
}

export function checkLanguage(
  language: string,
  languageName: LanguageName
): ELanguage {
  let langRes: ELanguage = ELanguage.English
  if (language === languageName.French) langRes = ELanguage.French
  // Spanish not active yet
  return langRes
}

export function checkValidStrategies(user: User): EStrategy[] {
  const validStrategies: EStrategy[] = []
  if (user.githubAuth) validStrategies.push(EStrategy.github)
  if (user.password) validStrategies.push(EStrategy.local)
  if (user.googleAuth) validStrategies.push(EStrategy.google)
  if (user.school42Auth) validStrategies.push(EStrategy.school42)
  return validStrategies
}

export function checkStrategy(strategy: EStrategy, user: User): boolean {
  if (strategy === EStrategy.github && user.githubAuth) return true
  if (strategy === EStrategy.local && user.password) return true
  if (strategy === EStrategy.google && user.googleAuth) return true
  if (strategy === EStrategy.school42 && user.school42Auth) return true
  return false
}
