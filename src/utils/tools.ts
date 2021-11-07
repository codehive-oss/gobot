export interface Tool {
    name: string
    id: number
    description: string
    price: number
}

const pickaxe = {
    name: "Pickaxe",
    id: 0,
    description: "Used to mine ores",
    price: 2000
}

export const tools : Tool[] = [pickaxe]

