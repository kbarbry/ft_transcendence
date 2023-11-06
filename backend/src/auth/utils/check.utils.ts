import { User } from '@prisma/client'

export enum EStrategy {
  local = 'local',
  github = 'github',
  google = 'google',
  school42 = 'school42'
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
