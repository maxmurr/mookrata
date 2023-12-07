type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  arrow_right: (props: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      {...props}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
      />
    </svg>
  ),
  arrow_left: (props: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      {...props}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
      />
    </svg>
  ),
  x: (props: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      {...props}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  ),
  minus: (props: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      {...props}
    >
      <path stroke-linecap='round' stroke-linejoin='round' d='M19.5 12h-15' />
    </svg>
  ),
  plus: (props: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      {...props}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M12 4.5v15m7.5-7.5h-15'
      />
    </svg>
  ),
  arrow_path: (props: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      {...props}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
      />
    </svg>
  ),
}
