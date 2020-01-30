interface Environment {
    env: 'dev' | 'prod'
    features: { [s: string]: boolean}
}
export const environment: Environment  = {
    env: 'dev',
    features: {}
}