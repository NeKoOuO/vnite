import { searchGames } from '~/stores/game'
import { cn } from '~/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion'
import { ScrollArea } from '@ui/scroll-area'
import { GameNav } from '../GameNav'
import { useTranslation } from 'react-i18next'

export function Search({ query }: { query: string }): JSX.Element {
  const { t } = useTranslation('game')
  const games = searchGames(query)
  return (
    <ScrollArea className={cn('w-full h-full pr-3 -mr-3')}>
      <Accordion
        type="multiple"
        defaultValue={['all']}
        className={cn('w-full text-xs flex flex-col gap-2')}
      >
        <AccordionItem value="all">
          <AccordionTrigger className={cn('bg-accent/30 text-xs p-1 pl-2')}>
            {t('list.search.results')}
          </AccordionTrigger>
          <AccordionContent className={cn('rounded-none pt-1 flex flex-col gap-1')}>
            {games.map((game) => (
              <GameNav key={game} gameId={game} groupId={'0'} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollArea>
  )
}
