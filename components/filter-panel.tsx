"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Filter, X, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

// Define filter option types
interface FilterOption {
  id: string
  name: string
  popular?: boolean
}

interface FilterPanelProps {
  contentType: "movie" | "tv"
}

// Popular languages with their ISO codes
const POPULAR_LANGUAGES: FilterOption[] = [
  { id: "en", name: "English", popular: true },
  { id: "hi", name: "Hindi", popular: true },
  { id: "ta", name: "Tamil", popular: true },
  { id: "te", name: "Telugu", popular: true },
  { id: "kn", name: "Kannada", popular: true },
  { id: "ml", name: "Malayalam", popular: true },
  { id: "ja", name: "Japanese", popular: true },
  { id: "zh", name: "Chinese", popular: true },
  { id: "ar", name: "Arabic", popular: true },
  { id: "ko", name: "Korean", popular: true },
  { id: "fr", name: "French", popular: true },
  { id: "es", name: "Spanish", popular: true },
  { id: "de", name: "German", popular: true },
  { id: "ru", name: "Russian", popular: true },
]

// Popular providers with their IDs
const POPULAR_PROVIDERS: FilterOption[] = [
  { id: "8", name: "Netflix", popular: true },
  { id: "9", name: "Amazon Prime", popular: true },
  { id: "337", name: "Disney+", popular: true },
  { id: "2", name: "Apple TV", popular: true },
  { id: "3", name: "Google Play", popular: true },
  { id: "15", name: "Hulu", popular: true },
  { id: "384", name: "HBO Max", popular: true },
  { id: "531", name: "Paramount+", popular: true },
  { id: "350", name: "Apple TV+", popular: true },
  { id: "283", name: "Crunchyroll", popular: true },
  { id: "386", name: "Peacock", popular: true },
  { id: "387", name: "Hotstar", popular: true },
  { id: "619", name: "Ullu", popular: true },
]

export function FilterPanel({ contentType }: FilterPanelProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get current filter values from URL
  const currentLanguages = searchParams.get("languages")?.split(",") || []
  const currentProviders = searchParams.get("providers")?.split(",") || []
  const currentCountries = searchParams.get("countries")?.split(",") || []
  const currentGenres = searchParams.get("genres")?.split(",") || []
  const currentYearRange = searchParams.get("years")?.split(",").map(Number) || [1900, new Date().getFullYear()]

  // State for filter options
  const [languages, setLanguages] = useState<FilterOption[]>([])
  const [providers, setProviders] = useState<FilterOption[]>([])
  const [countries, setCountries] = useState<FilterOption[]>([])
  const [genres, setGenres] = useState<FilterOption[]>([])
  const [yearRange, setYearRange] = useState<[number, number]>(currentYearRange as [number, number])

  // State for selected filters
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(currentLanguages)
  const [selectedProviders, setSelectedProviders] = useState<string[]>(currentProviders)
  const [selectedCountries, setSelectedCountries] = useState<string[]>(currentCountries)
  const [selectedGenres, setSelectedGenres] = useState<string[]>(currentGenres)

  // State for loading and UI
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [showAllLanguages, setShowAllLanguages] = useState(false)
  const [showAllProviders, setShowAllProviders] = useState(false)
  const [showAllCountries, setShowAllCountries] = useState(false)
  const [activeFilterTab, setActiveFilterTab] = useState("genres")

  // Add search states in the component
  const [searchLanguage, setSearchLanguage] = useState("")
  const [searchProvider, setSearchProvider] = useState("")
  const [searchCountry, setSearchCountry] = useState("")
  const [searchGenre, setSearchGenre] = useState("")

  // Add filtered options using useMemo
  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) => lang.name.toLowerCase().includes(searchLanguage.toLowerCase()))
  }, [languages, searchLanguage])

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => provider.name.toLowerCase().includes(searchProvider.toLowerCase()))
  }, [providers, searchProvider])

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => country.name.toLowerCase().includes(searchCountry.toLowerCase()))
  }, [countries, searchCountry])

  const filteredGenres = useMemo(() => {
    return genres.filter((genre) => genre.name.toLowerCase().includes(searchGenre.toLowerCase()))
  }, [genres, searchGenre])

  // Count active filters
  const activeFilterCount =
    selectedLanguages.length +
    selectedProviders.length +
    selectedCountries.length +
    selectedGenres.length +
    (yearRange[0] !== 1900 || yearRange[1] !== new Date().getFullYear() ? 1 : 0)

  // Memoized popular languages
  const popularLanguages = useMemo(() => {
    return languages.filter((lang) => POPULAR_LANGUAGES.some((popular) => popular.id === lang.id))
  }, [languages])

  // Memoized popular providers
  const popularProviders = useMemo(() => {
    return providers.filter((provider) => POPULAR_PROVIDERS.some((popular) => popular.id === provider.id))
  }, [providers])

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      setIsLoading(true)
      try {
        // Fetch all filter options in parallel for better performance
        const [languagesRes, providersRes, countriesRes, genresRes] = await Promise.all([
          fetch("/api/tmdb/configuration/languages"),
          fetch(`/api/tmdb/watch/providers/${contentType}?watch_region=US`),
          fetch("/api/tmdb/configuration/countries"),
          fetch(`/api/tmdb/genre/${contentType}/list`),
        ])

        // Process languages
        const languagesData = await languagesRes.json()
        const processedLanguages = languagesData
          .filter((lang: any) => lang.name && lang.iso_639_1)
          .map((lang: any) => {
            const isPopular = POPULAR_LANGUAGES.some((popular) => popular.id === lang.iso_639_1)
            return {
              id: lang.iso_639_1,
              name: lang.english_name || lang.name,
              popular: isPopular,
            }
          })
          .sort((a: FilterOption, b: FilterOption) => {
            // Sort popular languages first, then alphabetically
            if (a.popular && !b.popular) return -1
            if (!a.popular && b.popular) return 1
            return a.name.localeCompare(b.name)
          })

        setLanguages(processedLanguages)

        // Process providers
        const providersData = await providersRes.json()
        const processedProviders = providersData.results
          .filter((provider: any) => provider.provider_name)
          .map((provider: any) => {
            const isPopular = POPULAR_PROVIDERS.some((popular) => popular.id === provider.provider_id.toString())
            return {
              id: provider.provider_id.toString(),
              name: provider.provider_name,
              popular: isPopular,
            }
          })
          .sort((a: FilterOption, b: FilterOption) => {
            // Sort popular providers first, then alphabetically
            if (a.popular && !b.popular) return -1
            if (!a.popular && b.popular) return 1
            return a.name.localeCompare(b.name)
          })

        setProviders(processedProviders)

        // Process countries
        const countriesData = await countriesRes.json()
        setCountries(
          countriesData
            .filter((country: any) => country.english_name && country.iso_3166_1)
            .map((country: any) => ({
              id: country.iso_3166_1,
              name: country.english_name,
            }))
            .sort((a: FilterOption, b: FilterOption) => a.name.localeCompare(b.name)),
        )

        // Process genres
        const genresData = await genresRes.json()
        setGenres(
          genresData.genres
            .map((genre: any) => ({
              id: genre.id.toString(),
              name: genre.name,
            }))
            .sort((a: FilterOption, b: FilterOption) => a.name.localeCompare(b.name)),
        )
      } catch (error) {
        console.error("Error fetching filter options:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFilterOptions()
  }, [contentType])

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Update language filter
    if (selectedLanguages.length > 0) {
      params.set("languages", selectedLanguages.join(","))
    } else {
      params.delete("languages")
    }

    // Update provider filter
    if (selectedProviders.length > 0) {
      params.set("providers", selectedProviders.join(","))
    } else {
      params.delete("providers")
    }

    // Update country filter
    if (selectedCountries.length > 0) {
      params.set("countries", selectedCountries.join(","))
    } else {
      params.delete("countries")
    }

    // Update genres filter
    if (selectedGenres.length > 0) {
      params.set("genres", selectedGenres.join(","))
    } else {
      params.delete("genres")
    }

    // Update year range filter
    if (yearRange[0] !== 1900 || yearRange[1] !== new Date().getFullYear()) {
      params.set("years", yearRange.join(","))
    } else {
      params.delete("years")
    }

    // Preserve tab parameter if it exists
    const tab = searchParams.get("tab")
    if (tab) {
      params.set("tab", tab)
    }

    // Reset to page 1 when filters change
    params.set("page", "1")

    // Log the final parameters for debugging
    console.log("Applied filters:", Object.fromEntries(params.entries()))

    // Navigate with new params
    router.push(`${pathname}?${params.toString()}`)
    setIsOpen(false)
  }

  // Reset filters
  const resetFilters = () => {
    setSelectedLanguages([])
    setSelectedProviders([])
    setSelectedCountries([])
    setSelectedGenres([])
    setYearRange([1900, new Date().getFullYear()])
  }

  // Clear all filters and navigate
  const clearAllFilters = () => {
    resetFilters()

    const params = new URLSearchParams(searchParams.toString())
    params.delete("languages")
    params.delete("providers")
    params.delete("countries")
    params.delete("genres")
    params.delete("years")

    // Preserve tab parameter if it exists
    const tab = searchParams.get("tab")
    if (tab) {
      params.set("tab", tab)
    }

    // Reset to page 1
    params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`)
  }

  // Toggle filter selections
  const toggleLanguage = (languageId: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(languageId) ? prev.filter((id) => id !== languageId) : [...prev, languageId],
    )
  }

  const toggleProvider = (providerId: string) => {
    setSelectedProviders((prev) =>
      prev.includes(providerId) ? prev.filter((id) => id !== providerId) : [...prev, providerId],
    )
  }

  const toggleCountry = (countryId: string) => {
    setSelectedCountries((prev) =>
      prev.includes(countryId) ? prev.filter((id) => id !== countryId) : [...prev, countryId],
    )
  }

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) => (prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]))
  }

  // Get filter option name by ID
  const getLanguageName = (id: string) => languages.find((lang) => lang.id === id)?.name || id
  const getProviderName = (id: string) => providers.find((provider) => provider.id === id)?.name || id
  const getCountryName = (id: string) => countries.find((country) => country.id === id)?.name || id
  const getGenreName = (id: string) => genres.find((genre) => genre.id === id)?.name || id

  // Handle filter button click
  const handleFilterButtonClick = () => {
    setIsOpen(true)
  }

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Button variant="outline" size="sm" className="border-gray-700 gap-1 h-8" onClick={handleFilterButtonClick}>
          <Filter className="h-4 w-4" />
          Filter
          {activeFilterCount > 0 && (
            <Badge className="ml-1 bg-blue-600 text-white h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        <SheetContent className="bg-gray-900 border-gray-800 text-white w-full sm:max-w-md overflow-hidden flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-white">Filters</SheetTitle>
            <SheetDescription className="text-gray-400">
              Filter {contentType === "movie" ? "movies" : "TV shows"} by genre, language, provider, country, and year.
            </SheetDescription>
          </SheetHeader>

          <Tabs value={activeFilterTab} onValueChange={setActiveFilterTab} className="flex-1 flex flex-col">
            <TabsList className="bg-gray-800 border border-gray-700 mb-4 w-full grid grid-cols-5">
              <TabsTrigger value="genres" className="text-xs sm:text-sm">
                Genres
              </TabsTrigger>
              <TabsTrigger value="languages" className="text-xs sm:text-sm">
                Languages
              </TabsTrigger>
              <TabsTrigger value="providers" className="text-xs sm:text-sm">
                Providers
              </TabsTrigger>
              <TabsTrigger value="countries" className="text-xs sm:text-sm">
                Countries
              </TabsTrigger>
              <TabsTrigger value="years" className="text-xs sm:text-sm">
                Years
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 pr-4">
              <TabsContent value="genres" className="mt-0">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Search genres..."
                      value={searchGenre}
                      onChange={(e) => setSearchGenre(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white pl-8"
                    />
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {filteredGenres.map((genre) => (
                      <div key={genre.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`genre-${genre.id}`}
                          checked={selectedGenres.includes(genre.id)}
                          onCheckedChange={() => toggleGenre(genre.id)}
                          className="border-gray-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <Label htmlFor={`genre-${genre.id}`} className="text-sm cursor-pointer">
                          {genre.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="languages" className="mt-0">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Search languages..."
                      value={searchLanguage}
                      onChange={(e) => setSearchLanguage(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white pl-8"
                    />
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <h3 className="text-sm font-medium">Languages</h3>
                    <Button
                      variant="link"
                      className="text-blue-400 p-0 h-auto text-xs"
                      onClick={() => setShowAllLanguages(!showAllLanguages)}
                    >
                      {showAllLanguages ? "Show Popular" : "Show All"}
                    </Button>
                  </div>

                  <ScrollArea className="h-[300px] pr-4">
                    <div className="grid grid-cols-2 gap-2">
                      {(searchLanguage ? filteredLanguages : showAllLanguages ? languages : popularLanguages).map(
                        (language) => (
                          <div key={language.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`language-${language.id}`}
                              checked={selectedLanguages.includes(language.id)}
                              onCheckedChange={() => toggleLanguage(language.id)}
                              className="border-gray-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <Label htmlFor={`language-${language.id}`} className="text-sm cursor-pointer">
                              {language.name}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="providers" className="mt-0">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Search providers..."
                      value={searchProvider}
                      onChange={(e) => setSearchProvider(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white pl-8"
                    />
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <h3 className="text-sm font-medium">Providers</h3>
                    <Button
                      variant="link"
                      className="text-blue-400 p-0 h-auto text-xs"
                      onClick={() => setShowAllProviders(!showAllProviders)}
                    >
                      {showAllProviders ? "Show Popular" : "Show All"}
                    </Button>
                  </div>

                  <ScrollArea className="h-[300px] pr-4">
                    <div className="grid grid-cols-2 gap-2">
                      {(searchProvider ? filteredProviders : showAllProviders ? providers : popularProviders).map(
                        (provider) => (
                          <div key={provider.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`provider-${provider.id}`}
                              checked={selectedProviders.includes(provider.id)}
                              onCheckedChange={() => toggleProvider(provider.id)}
                              className="border-gray-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <Label htmlFor={`provider-${provider.id}`} className="text-sm cursor-pointer">
                              {provider.name}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="countries" className="mt-0">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Search countries..."
                      value={searchCountry}
                      onChange={(e) => setSearchCountry(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white pl-8"
                    />
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <h3 className="text-sm font-medium">Countries</h3>
                    <Button
                      variant="link"
                      className="text-blue-400 p-0 h-auto text-xs"
                      onClick={() => setShowAllCountries(!showAllCountries)}
                    >
                      {showAllCountries ? "Show Less" : "Show All"}
                    </Button>
                  </div>

                  <ScrollArea className="h-[300px] pr-4">
                    <div className="grid grid-cols-2 gap-2">
                      {(searchCountry ? filteredCountries : showAllCountries ? countries : countries.slice(0, 20)).map(
                        (country) => (
                          <div key={country.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`country-${country.id}`}
                              checked={selectedCountries.includes(country.id)}
                              onCheckedChange={() => toggleCountry(country.id)}
                              className="border-gray-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <Label htmlFor={`country-${country.id}`} className="text-sm cursor-pointer">
                              {country.name}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="years" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Year Range</h3>
                    <span className="text-sm text-gray-400">
                      {yearRange[0]} - {yearRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={yearRange}
                    min={1900}
                    max={new Date().getFullYear()}
                    step={1}
                    value={yearRange}
                    onValueChange={(value) => setYearRange(value as [number, number])}
                    className="w-full"
                  />

                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1900</span>
                    <span>{new Date().getFullYear()}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {[2020, 2010, 2000, 1990].map((startYear) => (
                      <Button
                        key={startYear}
                        variant="outline"
                        size="sm"
                        className="text-xs border-gray-700"
                        onClick={() => setYearRange([startYear, startYear + 9])}
                      >
                        {startYear}s
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="py-2 mt-2 border-t border-gray-800">
              <h3 className="text-sm font-medium mb-2">Active Filters:</h3>
              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                {selectedGenres.map((id) => (
                  <Badge
                    key={`genre-${id}`}
                    className="bg-red-600/20 text-red-400 hover:bg-red-600/30 cursor-pointer"
                    onClick={() => toggleGenre(id)}
                  >
                    {getGenreName(id)} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedLanguages.map((id) => (
                  <Badge
                    key={`lang-${id}`}
                    className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 cursor-pointer"
                    onClick={() => toggleLanguage(id)}
                  >
                    {getLanguageName(id)} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedProviders.map((id) => (
                  <Badge
                    key={`prov-${id}`}
                    className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 cursor-pointer"
                    onClick={() => toggleProvider(id)}
                  >
                    {getProviderName(id)} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedCountries.map((id) => (
                  <Badge
                    key={`country-${id}`}
                    className="bg-green-600/20 text-green-400 hover:bg-green-600/30 cursor-pointer"
                    onClick={() => toggleCountry(id)}
                  >
                    {getCountryName(id)} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {(yearRange[0] !== 1900 || yearRange[1] !== new Date().getFullYear()) && (
                  <Badge className="bg-yellow-600/20 text-yellow-400">
                    {yearRange[0]} - {yearRange[1]}
                  </Badge>
                )}
              </div>
            </div>
          )}

          <SheetFooter className="pt-2 border-t border-gray-800 mt-2">
            <div className="flex justify-between w-full gap-2">
              <Button variant="outline" className="border-gray-700 hover:bg-gray-800" onClick={resetFilters}>
                Reset
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mt-4 flex items-center flex-wrap gap-2">
          <span className="text-sm text-gray-400">Active filters:</span>
          {selectedGenres.map((id) => (
            <Badge key={`genre-display-${id}`} className="bg-red-600/20 text-red-400">
              {getGenreName(id)}
            </Badge>
          ))}
          {selectedLanguages.map((id) => (
            <Badge key={`lang-display-${id}`} className="bg-blue-600/20 text-blue-400">
              {getLanguageName(id)}
            </Badge>
          ))}
          {selectedProviders.map((id) => (
            <Badge key={`prov-display-${id}`} className="bg-purple-600/20 text-purple-400">
              {getProviderName(id)}
            </Badge>
          ))}
          {selectedCountries.map((id) => (
            <Badge key={`country-display-${id}`} className="bg-green-600/20 text-green-400">
              {getCountryName(id)}
            </Badge>
          ))}
          {(yearRange[0] !== 1900 || yearRange[1] !== new Date().getFullYear()) && (
            <Badge className="bg-yellow-600/20 text-yellow-400">
              {yearRange[0]} - {yearRange[1]}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-gray-400 hover:text-white"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}

