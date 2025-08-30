export default function TestErrorPage() {
  // This will trigger a 500 error
  throw new Error('This is a test 500 error!')
  
  return (
    <div>
      <h1>This won't render because of the error above</h1>
    </div>
  )
}
