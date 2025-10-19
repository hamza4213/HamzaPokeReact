import { ImageSourcePropType } from "react-native"

export type listPokeMon = {
  name: string
  url: string
}
export type defaultListResponse = {
  count: number
  results: listPokeMon[]
  previous: null
  next: string
}
export type Pokemon = {
  abilities: abilities[]
  base_experience: number
  cries: cries
  forms: form[]
  game_indices: [
    {
      game_index: 153
      version: {
        name: "red"
        url: "https://pokeapi.co/api/v2/version/1/"
      }
    },
    {
      game_index: 153
      version: {
        name: "blue"
        url: "https://pokeapi.co/api/v2/version/2/"
      }
    },
    {
      game_index: 153
      version: {
        name: "yellow"
        url: "https://pokeapi.co/api/v2/version/3/"
      }
    },
    {
      game_index: 1
      version: {
        name: "gold"
        url: "https://pokeapi.co/api/v2/version/4/"
      }
    },
    {
      game_index: 1
      version: {
        name: "silver"
        url: "https://pokeapi.co/api/v2/version/5/"
      }
    },
    {
      game_index: 1
      version: {
        name: "crystal"
        url: "https://pokeapi.co/api/v2/version/6/"
      }
    },
    {
      game_index: 1
      version: {
        name: "ruby"
        url: "https://pokeapi.co/api/v2/version/7/"
      }
    },
    {
      game_index: 1
      version: {
        name: "sapphire"
        url: "https://pokeapi.co/api/v2/version/8/"
      }
    },
    {
      game_index: 1
      version: {
        name: "emerald"
        url: "https://pokeapi.co/api/v2/version/9/"
      }
    },
    {
      game_index: 1
      version: {
        name: "firered"
        url: "https://pokeapi.co/api/v2/version/10/"
      }
    },
    {
      game_index: 1
      version: {
        name: "leafgreen"
        url: "https://pokeapi.co/api/v2/version/11/"
      }
    },
    {
      game_index: 1
      version: {
        name: "diamond"
        url: "https://pokeapi.co/api/v2/version/12/"
      }
    },
    {
      game_index: 1
      version: {
        name: "pearl"
        url: "https://pokeapi.co/api/v2/version/13/"
      }
    },
    {
      game_index: 1
      version: {
        name: "platinum"
        url: "https://pokeapi.co/api/v2/version/14/"
      }
    },
    {
      game_index: 1
      version: {
        name: "heartgold"
        url: "https://pokeapi.co/api/v2/version/15/"
      }
    },
    {
      game_index: 1
      version: {
        name: "soulsilver"
        url: "https://pokeapi.co/api/v2/version/16/"
      }
    },
    {
      game_index: 1
      version: {
        name: "black"
        url: "https://pokeapi.co/api/v2/version/17/"
      }
    },
    {
      game_index: 1
      version: {
        name: "white"
        url: "https://pokeapi.co/api/v2/version/18/"
      }
    },
    {
      game_index: 1
      version: {
        name: "black-2"
        url: "https://pokeapi.co/api/v2/version/21/"
      }
    },
    {
      game_index: 1
      version: {
        name: "white-2"
        url: "https://pokeapi.co/api/v2/version/22/"
      }
    },
  ]
  height: number
  held_items: []
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: move[]
  name: string
  order: number
  past_abilities: past_abilities[]
  past_types: []
  species: {
    name: string
    url: string
  }
  stats: stats[]
  types: pokeType[]
  weight: number
}
type abilities = {
  ability: {
    name: string
    url: ImageSourcePropType
  }
  is_hidden: boolean
  slot: number
}
type cries = {
  latest: string
  legacy: string
}
type form = {
  name: string
  url: string
}
type move = {
  move: {
    name: string
    url: string
  }
  version_group_details: version_group_details[]
}
type version_group_details = {
  level_learned_at: number
  move_learn_method: {
    name: string
    url: string
  }
  order: null
  version_group: {
    name: string
    url: string
  }
}
type past_abilities = {
  abilities: [
    {
      ability: null
      is_hidden: boolean
      slot: 3
    },
  ]
  generation: {
    name: string
    url: string
  }
}
type stats = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}
type pokeType = {
  slot: number
  type: {
    name: string
    url: string
  }
}
