
export default function PageHeader({ title, subtitle = '' }) {
  return <>
    <h1 className='page-header'>{title}</h1>
    <h2 className='page-sub-title'>{subtitle}</h2>
  </>
}
