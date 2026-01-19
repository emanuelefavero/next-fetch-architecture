import { TITLE } from '@/config/metadata'
import { ModeToggle } from '@/features/theme/components/mode-toggle'

export function Header() {
  return (
    <header className='py-py flex items-center justify-between gap-2 border-b border-border px-px'>
      <div className='font-bold'>{TITLE}</div>
      <div className='flex items-center gap-4'>
        <ModeToggle />
      </div>
    </header>
  )
}
