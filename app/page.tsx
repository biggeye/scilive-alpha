const Index = () => {
  const apiResults = "API call results will be displayed here.";
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <h2 className="font-bold text-4xl mb-4">S c i L i v e</h2>
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://www.scifiction.com"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            SciFiction.com
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Index;