"use client";
import { useState, useEffect } from 'react'
import { Menu, Search, ChevronDown, ExternalLink } from 'lucide-react'

export default function WikipediaResumeV3() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [textSize, setTextSize] = useState('standard')
  const [pageWidth, setPageWidth] = useState('standard')
  const [theme, setTheme] = useState('automatic')
  const [isAppearanceVisible, setIsAppearanceVisible] = useState(true)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchInput = e.currentTarget.search.value
    
    if (!searchInput.trim()) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500) // Remove shake after animation
      return
    }
    
    // If search has value, redirect to Wikipedia search
    window.open(`https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(searchInput)}`, '_blank')
  }

  // Handle text size changes
  const handleTextSize = (size: string) => {
    setTextSize(size)
    const html = document.documentElement
    html.classList.remove('text-sm', 'text-base', 'text-lg')
    switch (size) {
      case 'small':
        html.classList.add('text-sm')
        break
      case 'large':
        html.classList.add('text-lg')
        break
      default:
        html.classList.add('text-base')
    }
  }

  // Handle width changes
  const handleWidth = (width: string) => {
    setPageWidth(width)
  }

  // Handle theme changes
  const handleTheme = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    const html = document.documentElement
    
    if (newTheme === 'automatic') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    } else {
      if (newTheme === 'dark') {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }

  // Listen for system theme changes when in automatic mode
  useEffect(() => {
    if (theme === 'automatic') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  // Add this useEffect to initialize theme on load
  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme') || 'automatic'
    setTheme(savedTheme)
    handleTheme(savedTheme)
  }, [])

  const TableOfContents = () => (
    <div className="bg-[#f8f9fa] dark:bg-[#27292d] p-3 mb-6 sticky top-4">
      <div className="flex items-center gap-1 font-bold mb-2">
        Contents
        <span className="font-normal text-sm">
          [<button className="text-[#36c] hover:text-[#447ff5]">hide</button>]
        </span>
      </div>
      <nav>
        <ol className="list-none text-sm space-y-1">
          <li><a href="#top" className="text-[#36c] hover:text-[#447ff5]">(Top)</a></li>
          <li><a href="#biography" className="text-[#36c] hover:text-[#447ff5]">Biography</a></li>
          <li>
            <a href="#career" className="text-[#36c] hover:text-[#447ff5]">Career</a>
            <ol className="list-none pl-4 mt-1 space-y-1">
              <li><a href="#projects" className="text-[#36c] hover:text-[#447ff5]">Notable Projects</a></li>
              <li><a href="#current-work" className="text-[#36c] hover:text-[#447ff5]">Current Work</a></li>
            </ol>
          </li>
          <li><a href="#references" className="text-[#36c] hover:text-[#447ff5]">References</a></li>
          <li><a href="#external-links" className="text-[#36c] hover:text-[#447ff5]">External links</a></li>
        </ol>
      </nav>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-[#202122] text-[#202122] dark:text-[#fff] font-sans">
      {/* Header */}
      <header className="bg-[#f8f9fa] dark:bg-[#27292d] border-b border-gray-300 dark:border-gray-700">
        <div className={`${pageWidth === 'wide' ? 'max-w-7xl' : 'max-w-6xl'} mx-auto px-4 py-2 flex items-center`}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded hover:bg-gray-200 mr-4"
          >
            <Menu size={20} />
          </button>
          <img src="wikipedia.png" alt="Wikipedia Logo" className="h-10 w-10 mr-2" />
          <div className="flex-grow flex items-center">
            <form 
              id="search-form"
              onSubmit={handleSearch}
              className="relative flex w-full max-w-xl"
            >
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="search"
                  placeholder="Search Wikipedia"
                  className="w-full py-1 pl-9 pr-3 border border-gray-300 dark:border-gray-700 rounded-l dark:bg-[#27292d]"
                />
              </div>
              <button 
                type="submit"
                className={`px-4 py-1 bg-[#f8f9fa] dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                  isShaking ? 'animate-shake' : ''
                }`}
              >
                Search
              </button>
            </form>
          </div>
          <div className="ml-4 flex items-center space-x-4 text-sm">
            <a href="#" className="text-blue-600 hover:underline">Create account</a>
            <a href="#" className="text-blue-600 hover:underline">Log in</a>
          </div>
        </div>
      </header>

      <div className={`${pageWidth === 'wide' ? 'max-w-7xl' : 'max-w-6xl'} mx-auto px-4 py-4 flex relative gap-8`}>
        {/* Left sidebar with table of contents */}
        <aside className="w-40 flex-shrink-0">
          <div className="bg-[#f8f9fa] dark:bg-[#27292d] p-3 mb-6 sticky top-4">
            <TableOfContents />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-normal border-b border-gray-300 pb-1 mb-1">Owen Wahlgren</h1>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center text-sm text-[#36c] hover:text-[#447ff5]"
              >
                <span className="mr-1">Add languages</span> <ChevronDown size={16} />
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Deutsch</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Español</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Français</a>
                </div>
              )}
            </div>
          </div>

          <div className="flex border-b border-gray-300 mb-4">
            <div className="flex text-sm">
              <a href="#" className="py-2 px-4 border-b-2 border-[#36c] font-medium text-[#36c]">Article</a>
              <a href="#" className="py-2 px-4 text-[#36c] hover:text-[#447ff5]">Talk</a>
            </div>
            <div className="flex ml-auto text-sm">
              <a href="#" className="py-2 px-4 font-medium">Read</a>
              <a href="#" className="py-2 px-4 text-[#36c] hover:text-[#447ff5]">Edit</a>
              <a href="#" className="py-2 px-4 text-[#36c] hover:text-[#447ff5]">View history</a>
              <button className="py-2 px-4 text-gray-400 hover:text-gray-600">
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <article className="prose dark:prose-invert max-w-none relative">
            <div className="float-right ml-4 mb-4 border border-gray-300 dark:border-gray-700 p-2 bg-[#f8f9fa] dark:bg-[#27292d] text-xs">
              <div className="flex justify-center">
                <img src="owen.jpg" alt="Owen Wahlgren" className="mb-1 w-60 h-60 object-cover" />
              </div>
              <p className="text-center italic">Owen Wahlgren in 2019</p>
              <table className="mt-1 w-full">
                <tbody className="text-left">
                  <tr>
                    <th className="font-bold pr-1 align-top text-left bg-[#eaecf0] py-1 px-2">Alma mater</th>
                    <td className="py-1 px-2">New York University (Computer Science)</td>
                  </tr>
                  <tr>
                    <th className="font-bold pr-1 align-top text-left bg-[#eaecf0] py-1 px-2">Occupation</th>
                    <td className="py-1 px-2">Developer Relations Engineer @ Ava Labs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Owen Wahlgren</strong> is a Developer Relations Engineer at Ava Labs, where he has been working since August 2024. Prior to this, he served as a Solutions Engineer at Polygon Labs from 2022 to 2024. Wahlgren studied Computer Science at New York University (NYU) and has contributed to various blockchain and gaming projects throughout his career.
            </p>

            <h2 id="career" className="text-xl font-normal border-b border-gray-300 pb-1 mb-3 mt-8 flex items-center gap-2">
              Career
              <span className="text-sm font-normal text-[#36c]">[<a href="#" className="hover:text-[#447ff5]">edit</a>]</span>
            </h2>
            <p className="mb-6">
              Wahlgren began his career in blockchain technology, working as a Blockchain Specialist at lutz.com from February to July 2021. He then co-founded de.Social, where he served as CTO from April to September 2021. After working as a Solutions Engineer at Polygon Labs from August 2022 to February 2024, he joined Ava Labs as a Developer Relations Engineer in August 2024, where he focuses on supporting and growing the developer ecosystem.
            </p>

            <h2 id="projects" className="text-xl font-normal border-b border-gray-300 pb-1 mb-3 mt-8">Notable Projects</h2>
            <ul className="mb-6">
            <li><strong>Polygon &ldquo;Blueprint: Games Guide&rdquo;</strong> - A comprehensive guide for building Web3 games</li>
            <li><strong>Sounds of the Blockchain</strong> - An NFT project featuring oscilloscope audio visualization</li>
              <li><strong>LinkToss</strong> - A Chainlink-powered coin flip gambling application</li>
              <li><strong>Uniswap V2 &ldquo;Sniper&rdquo;</strong> - A tool for buying new Uniswap V2 listings while detecting honeypots</li>
              <li><strong>aim_gloom</strong> - A Counter-Strike 2 1v1 map created in Hammer</li>
            </ul>

            <h2 id="references" className="text-xl font-normal border-b border-gray-300 pb-1 mb-3 mt-8">References</h2>
            <ol className="list-decimal list-inside mb-6">
              <li><a href="https://twitter.com/owenwahlgren" className="text-blue-600 hover:underline">Twitter/X Profile <ExternalLink className="inline" size={14} /></a></li>
              <li><a href="https://linkedin.com/in/owenwahlgren" className="text-blue-600 hover:underline">LinkedIn Profile <ExternalLink className="inline" size={14} /></a></li>
              <li><a href="https://github.com/owenwahlgren" className="text-blue-600 hover:underline">GitHub Profile <ExternalLink className="inline" size={14} /></a></li>
            </ol>
          </article>

          {/* Categories */}
          <div className="mt-8 pt-4 border-t border-gray-300">
            <h2 className="text-xl font-normal mb-2">Categories:</h2>
            <ul className="flex flex-wrap gap-2">
              <li><a href="https://en.wikipedia.org/wiki/Category:Computer_programmers" className="text-blue-600 hover:underline">Computer programmers</a></li>
              <li><a href="https://en.wikipedia.org/wiki/Category:New_York_University_alumni" className="text-blue-600 hover:underline">New York University alumni</a></li>
              <li><a href="https://en.wikipedia.org/wiki/Category:Video_game_developers" className="text-blue-600 hover:underline">Video game developers</a></li>
              <li><a href="https://en.wikipedia.org/wiki/Category:Software_engineers" className="text-blue-600 hover:underline">Software engineers</a></li>
            </ul>
          </div>
        </main>

        {/* Right sidebar for appearance */}
        <aside className="w-40 flex-shrink-0">
          {isAppearanceVisible && (
            <div className="sticky top-4 text-sm bg-[#f8f9fa] dark:bg-[#27292d] p-2">
              <div className="font-bold mb-2">Appearance</div>
              <div className="space-y-2">
                <div>
                  <div className="mb-1">Text</div>
                  <div className="flex flex-col gap-1">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="text-size" 
                        className="accent-[#36c]"
                        checked={textSize === 'small'}
                        onChange={() => handleTextSize('small')}
                      />
                      <span>Small</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="text-size" 
                        className="accent-[#36c]"
                        checked={textSize === 'standard'}
                        onChange={() => handleTextSize('standard')}
                      />
                      <span>Standard</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="text-size" 
                        className="accent-[#36c]"
                        checked={textSize === 'large'}
                        onChange={() => handleTextSize('large')}
                      />
                      <span>Large</span>
                    </label>
                  </div>
                </div>
                <div>
                  <div className="mb-1">Width</div>
                  <div className="flex flex-col gap-1">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="width" 
                        className="accent-[#36c]"
                        checked={pageWidth === 'standard'}
                        onChange={() => handleWidth('standard')}
                      />
                      <span>Standard</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="width" 
                        className="accent-[#36c]"
                        checked={pageWidth === 'wide'}
                        onChange={() => handleWidth('wide')}
                      />
                      <span>Wide</span>
                    </label>
                  </div>
                </div>
                <div>
                  <div className="mb-1">Theme</div>
                  <div className="flex flex-col gap-1">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="theme" 
                        className="accent-[#36c]"
                        checked={theme === 'automatic'}
                        onChange={() => handleTheme('automatic')}
                      />
                      <span>Automatic</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="theme" 
                        className="accent-[#36c]"
                        checked={theme === 'light'}
                        onChange={() => handleTheme('light')}
                      />
                      <span>Light</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="theme" 
                        className="accent-[#36c]"
                        checked={theme === 'dark'}
                        onChange={() => handleTheme('dark')}
                      />
                      <span>Dark</span>
                    </label>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsAppearanceVisible(false)}
                className="w-full mt-2 px-2 py-1 text-[#36c] hover:text-[#447ff5] border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-[#27292d]"
              >
                Hide
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-[#f8f9fa] dark:bg-[#27292d] border-t border-gray-300 dark:border-gray-700 mt-8 py-4 text-sm">
        <div className={`${pageWidth === 'wide' ? 'max-w-7xl' : 'max-w-6xl'} mx-auto px-4`}>
          <p className="text-center text-gray-600 mb-2">
            This page was last edited on 22 September 2023, at 15:32 (UTC).
          </p>
          <p className="text-center text-gray-600">
            Text is available under the <a href="#" className="text-blue-600 hover:underline">Creative Commons Attribution-ShareAlike License 3.0</a>;
            additional terms may apply. By using this site, you agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            Wikipedia® is a registered trademark of the <a href="#" className="text-blue-600 hover:underline">Wikimedia Foundation, Inc.</a>, a non-profit organization.
          </p>
        </div>
      </footer>
    </div>
  )
}