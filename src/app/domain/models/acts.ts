// 3Acts domain model
type Act1 = {
  setup: string
  inciting_incident: string
  turning_point: string
}

type Act2 = {
  rising_action: string
  midpoint: string
  crisis: string
}

type Act3 = {
  climax: string
  denouement: string
}

export interface Acts {
  act_1: Act1
  act_2: Act2
  act_3: Act3
} 