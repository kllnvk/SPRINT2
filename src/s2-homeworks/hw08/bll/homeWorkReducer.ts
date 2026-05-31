import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: any, action: any): any => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            return [...state].sort((a: UserType, b: UserType) => {
                return action.payload === 'up'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            })
        }
        case 'check': {
            return state.filter((u:UserType) => u.age >= 18)
        }
        default:
            return state
    }
}
