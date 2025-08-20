import type { SVGProps } from "react"

export const ChatGptIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.5 17.5c-1.5 1.5-3.5 2.5-5.5 2.5s-4-1-5.5-2.5" />
    <path d="M21 12c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8" />
    <path d="M21 12c0-4.4-3.6-8-8-8s-8 3.6-8 8" />
    <path d="m14.5 7.5 3-3" />
    <path d="m9.5 7.5-3-3" />
  </svg>
)

export const GeminiIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3v2" />
    <path d="M12 19v2" />
    <path d="M3 12h2" />
    <path d="M19 12h2" />
    <path d="M16.2 7.8 15 9" />
    <path d="M9 15 7.8 16.2" />
    <path d="m7.8 7.8 1.2 1.2" />
    <path d="M15 15 16.2 16.2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
