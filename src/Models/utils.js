export function renderHealthy() {
  return (
    <div style={{ margin: 7.5, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <div style={{ width: 7.5, height: 7.5, borderRadius: 7.5, backgroundColor: '#66FF33' }} />
    </div>
  )
}

export function renderInfected() {
  return (
    <div style={{ margin: 7.5, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <div style={{ width: 7.5, height: 7.5, borderRadius: 7.5, backgroundColor: '#FF0000' }} />
    </div>
  )
}

export function renderRecovered() {
  return (
    <div style={{ margin: 7.5, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <div style={{ width: 7.5, height: 7.5, borderRadius: 7.5, backgroundColor: '#808080' }} />
    </div>
  )
}