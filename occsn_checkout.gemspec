$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "occsn_checkout/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "occsn_checkout"
  s.version     = OccsnExperiences::OccsnCheckout::VERSION
  s.authors     = ["Nick Landgrebe"]
  s.email       = ["nick@landgre.be"]
  s.homepage    = "https://www.getoccasion.com"
  s.summary     = "A Checkout experience"
  s.description = "The new Occasion checkout experience"
  s.license     = "MIT"

  s.files = Dir["{app,lib}/**/*", "MIT-LICENSE", "README.md"]

  s.add_dependency "rails", ">= 4.2.0"
end
