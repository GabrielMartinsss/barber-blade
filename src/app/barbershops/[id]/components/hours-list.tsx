const weekDays = [
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sabado',
]

export function HoursList() {
  return (
    <div className="space-y-2.5 text-sm capitalize dark:text-zinc-50">
      <div className="flex items-center justify-between">
        <span className="dark:text-zinc-500">Domingo</span>
        <span>Fechado</span>
      </div>
      {weekDays.map((day) => (
        <div key={day} className="flex items-center justify-between">
          <span className="dark:text-zinc-500">{day}</span>
          <span>09:00 - 21:00</span>
        </div>
      ))}
    </div>
  )
}
