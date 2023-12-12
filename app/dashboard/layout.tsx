export default function DashboardLayout(props: {
  children: React.ReactNode,
  social: React.ReactNode,
  gallery: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div>
        {/* Gallery Section */}
        {props.gallery}
      </div>
      <div style={{ width: '65%' }}>
        {/* Create Section */}
        {props.children}
      </div>
      <div style={{ width: '10%' }}>
        {/* Social Section */}
        {props.social}
      </div>
    </div>
  )
}
