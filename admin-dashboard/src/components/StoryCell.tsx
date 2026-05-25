import type { Story } from '../lib/types'

interface Props {
  stories: Story[]
}

function storyUrl(story: Story): string {
  // Build the public story URL using the same pattern as the n8n workflow
  return `https://reminology.com/story/${story.id}`
}

export default function StoryCell({ stories }: Props) {
  if (stories.length === 0) return <span className="text-gray-600 text-xs">—</span>

  return (
    <div className="flex flex-col gap-1">
      {stories.map((s, i) => (
        <a
          key={s.id}
          href={storyUrl(s)}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2 truncate max-w-[180px]"
          title={storyUrl(s)}
        >
          Story {i + 1} ({s.language ?? 'en'})
        </a>
      ))}
    </div>
  )
}
