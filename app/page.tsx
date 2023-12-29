const Home = () => {
  const apiResults = "API call results will be displayed here.";
  
  
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center">
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        Powered by{' '}
        <a href="https://www.scifiction.com" target="_blank" className="font-bold hover:underline" rel="noreferrer">
          <img src="/scifiction.png" alt="SciFiction" width="70px" />
        </a>
      </p>
    </footer>
  </div>
  )
}

export default Home;