import { User } from '@prisma/client'
import { randomBytes } from 'crypto'

export enum EStrategy {
  local = 'local',
  github = 'github',
  google = 'google',
  school42 = 'school42'
}

export async function checkUsername(username: string): Promise<string> {
  let checkedUsername = username.trim().slice(0, 29)
  if (
    username.length <= 0 ||
    (await this.userService.isUsernameUsed(username))
  ) {
    const slicedUsername = username.slice(0, 10)
    const nanoIdUsername = randomBytes(15).toString('hex').slice(0, 15)
    checkedUsername = slicedUsername.trim() + '-' + nanoIdUsername
  }
  return checkedUsername
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
