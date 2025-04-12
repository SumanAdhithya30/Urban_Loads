import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import {
  Wind,
  ArrowRight,
  Activity,
  Brain,
  Leaf,
  Database,
  Cloud,
  Zap,
  ChevronRight,
  BarChart3,
  CheckCircle,
} from "lucide-react";

// Animated wave component for hero section background
const WaveAnimation = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0 opacity-30">
    <svg className="w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        className="fill-blue-200 opacity-70"
      />
      <path
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
        className="fill-green-200 opacity-50"
      />
      <path
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        className="fill-blue-100 opacity-40"
      />
    </svg>
  </div>
);

// Energy particle effect component
const EnergyParticles = () => {
  const particles = Array.from({ length: 30 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-500 opacity-70"
          style={{
            width: `${Math.random() * 10 + 3}px`,
            height: `${Math.random() * 10 + 3}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.5)",
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function UrbanLoadLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDashboardClick = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  };

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset for the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col overflow-hidden">
      {/* Navigation - with backdrop filter and glass effect */}
      <nav
        className={`py-4 px-6 md:px-10 lg:px-20 flex justify-between items-center fixed w-full z-50 transition-all duration-300 ${
          scrollY > 20
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <Link
          to="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity group"
        >
          <div className="relative">
            <Activity className="h-6 w-6 text-blue-600 transition-all duration-300 group-hover:scale-110" />
            <div className="absolute -inset-1 bg-blue-500 rounded-full blur-md opacity-30 group-hover:opacity-70 transition-opacity"></div>
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            UrbanLoad
          </span>
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          <button
            onClick={() => scrollToSection("features")}
            className="text-gray-700 hover:text-blue-600 transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-gray-700 hover:text-blue-600 transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-700 hover:text-blue-600 transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all"
          >
            About
          </button>
          {isLoaded &&
            (isSignedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Dashboard
                </button>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Login
              </button>
            ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
        >
          <svg
            className="h-6 w-6 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu - with glass effect */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg z-40 md:hidden animate-fadeIn">
          <div className="flex flex-col p-4 space-y-3">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 py-2 hover:text-blue-600 text-left flex items-center space-x-2"
            >
              <span>Features</span>
              <ChevronRight size={16} className="text-blue-500" />
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-700 py-2 hover:text-blue-600 text-left flex items-center space-x-2"
            >
              <span>How It Works</span>
              <ChevronRight size={16} className="text-blue-500" />
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 py-2 hover:text-blue-600 text-left flex items-center space-x-2"
            >
              <span>About</span>
              <ChevronRight size={16} className="text-blue-500" />
            </button>
            {isLoaded &&
              (isSignedIn ? (
                <div className="flex items-center justify-between py-2">
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  >
                    Dashboard
                  </button>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigate("/signin");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  Login
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Hero Section - enhanced with better animations and effects */}
      <section className="pt-24 pb-16 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col md:flex-row items-center justify-between min-h-screen relative overflow-hidden">
        {/* Background animated elements */}
        <WaveAnimation />
        <EnergyParticles />

        <div className="w-full md:w-1/2 space-y-6 z-10">
          <div className="relative inline-block mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Smart Energy Platform
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent inline-block">
              UrbanLoad:
            </span>
            <span className="block mt-1">Smarter Cities.</span>
            <span className="block mt-1">Greener Tomorrow.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-md relative">
            AI-powered energy forecasting and sustainability intelligence for
            urban planners and citizens.
            <span className="absolute -left-2 -top-2 text-blue-500 opacity-20 text-6xl font-serif">
              "
            </span>
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleDashboardClick}
              className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5 relative overflow-hidden"
            >
              <span className="relative z-10">
                {isSignedIn ? "Go to Dashboard" : "Get Started"}
              </span>
              <ArrowRight
                size={18}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
              <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </button>

            {!isSignedIn && (
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-3 border border-blue-600 text-blue-600 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow"
              >
                Login
              </button>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-12 md:mt-0 relative z-10">
          <div className="relative h-64 md:h-96 w-full rounded-xl bg-gradient-to-br from-blue-500/10 to-green-500/10 overflow-hidden shadow-xl border border-white/50 backdrop-filter backdrop-blur-sm">
            {/* Energy visualization elements */}
            <div className="absolute inset-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <Wind
                  key={i}
                  className="absolute text-blue-600 animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: Math.random() * 0.8 + 0.2,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                  size={Math.random() * 30 + 20}
                />
              ))}
            </div>

            {/* Energy data visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white transform transition-transform hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Activity size={36} className="text-blue-600" />
                  <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    LIVE DATA
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        Renewable Usage
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        70%
                      </span>
                    </div>
                    <div className="h-3 bg-green-100 rounded-full w-full mb-2 relative overflow-hidden">
                      <div
                        className="absolute h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                        style={{ width: "70%" }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse-fast"></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        Grid Load
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        40%
                      </span>
                    </div>
                    <div className="h-3 bg-blue-100 rounded-full w-full relative overflow-hidden">
                      <div
                        className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        style={{ width: "40%" }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse-fast"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Solar</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Wind</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative floating circles */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-300/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section - with hover effects and animations */}
      <section
        id="features"
        className="py-20 px-6 md:px-10 lg:px-20 bg-white relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-green-50 rounded-full blur-3xl opacity-60"></div>

        <div className="text-center mb-16 relative z-10">
          <div className="inline-block mb-2">
            <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              FEATURES
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Intelligent Urban Energy Management
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform uses advanced AI to transform how cities manage and
            optimize their energy resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 transition-all duration-500 hover:shadow-xl border border-blue-100/50 relative overflow-hidden">
            {/* Glowing background effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-20 blur rounded-xl group-hover:blur-md transition-all duration-700"></div>

            <div className="bg-blue-100 group-hover:bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 transition-all duration-300 relative z-10">
              <Activity size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 relative z-10">
              ⚡ Predict Energy Spikes
            </h3>
            <p className="text-gray-600 relative z-10">
              Leverage machine learning to anticipate energy demand increases
              and optimize resource allocation in real-time.
            </p>

            {/* Decorative arrow */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight size={20} className="text-blue-500" />
            </div>
          </div>

          <div className="group bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 transition-all duration-500 hover:shadow-xl border border-blue-100/50 relative overflow-hidden">
            {/* Glowing background effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-20 blur rounded-xl group-hover:blur-md transition-all duration-700"></div>

            <div className="bg-blue-100 group-hover:bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 transition-all duration-300 relative z-10">
              <Brain size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 relative z-10">
              🧠 Generate Policy Recommendations
            </h3>
            <p className="text-gray-600 relative z-10">
              Get AI-powered suggestions for energy policies that balance
              efficiency, cost, and environmental impact.
            </p>

            {/* Decorative arrow */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight size={20} className="text-blue-500" />
            </div>
          </div>

          <div className="group bg-gradient-to-br from-white to-green-50 rounded-xl p-8 transition-all duration-500 hover:shadow-xl border border-green-100/50 relative overflow-hidden">
            {/* Glowing background effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-20 blur rounded-xl group-hover:blur-md transition-all duration-700"></div>

            <div className="bg-green-100 group-hover:bg-green-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 transition-all duration-300 relative z-10">
              <Leaf size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 relative z-10">
              🌿 Track Sustainability Metrics
            </h3>
            <p className="text-gray-600 relative z-10">
              Monitor carbon emissions, renewable energy utilization, and
              sustainability KPIs with customizable dashboards.
            </p>

            {/* Decorative arrow */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight size={20} className="text-green-500" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - with interactive flow diagram */}
      <section
        id="how-it-works"
        className="py-20 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>

        <div className="text-center mb-16 relative z-10">
          <div className="inline-block mb-2">
            <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              PROCESS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How UrbanLoad Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A seamless process combining weather data, machine learning, and
            energy analytics.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto relative">
          {/* Connected line between items */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 -z-10 transform -translate-y-1/2 rounded-full">
            <div className="h-full bg-white/90 w-8 absolute left-1/3 -translate-x-1/2"></div>
            <div className="h-full bg-white/90 w-8 absolute left-2/3 -translate-x-1/2"></div>
          </div>

          <div className="flex-1 flex flex-col items-center text-center relative group transform hover:-translate-y-2 transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center mb-6 z-10 shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-shadow duration-300">
              <span className="text-xl font-bold">1</span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md h-full border border-blue-100 group-hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4 p-2 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Database size={36} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                Load Forecasting via ML
              </h3>
              <p className="text-gray-600">
                Our algorithms analyze historical energy usage patterns to
                predict future demand with high accuracy.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-blue-600 text-sm">
                  <CheckCircle size={16} />
                  <span>Pattern Recognition</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center text-center relative group transform hover:-translate-y-2 transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center mb-6 z-10 shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-shadow duration-300">
              <span className="text-xl font-bold">2</span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md h-full border border-blue-100 group-hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4 p-2 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Cloud size={36} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                Weather-Informed Adjustments
              </h3>
              <p className="text-gray-600">
                Real-time weather data integration allows dynamic adjustments to
                energy forecasts.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-blue-600 text-sm">
                  <CheckCircle size={16} />
                  <span>Real-time Updates</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center text-center relative group transform hover:-translate-y-2 transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center mb-6 z-10 shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-shadow duration-300">
              <span className="text-xl font-bold">3</span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md h-full border border-blue-100 group-hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4 p-2 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <BarChart3 size={36} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                Data-Driven Decision Making
              </h3>
              <p className="text-gray-600">
                Translate analytics into actionable insights for policy makers
                and energy managers.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-blue-600 text-sm">
                  <CheckCircle size={16} />
                  <span>Smart Recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - with animated counters */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-blue-600 flex justify-center mb-4">
                <Zap size={40} className="animate-pulse" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">30%</h3>
              <p className="text-gray-600">Average Energy Savings</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-green-600 flex justify-center mb-4">
                <Leaf size={40} />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">50+</h3>
              <p className="text-gray-600">Cities Implementing</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-blue-600 flex justify-center mb-4">
                <Activity size={40} />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">1M+</h3>
              <p className="text-gray-600">Forecasts Generated</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - with team info and mission statement */}
      <section
        id="about"
        className="py-20 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-2">
              <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                ABOUT US
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600">
              At UrbanLoad, we believe in harnessing the power of data and AI to
              create more sustainable, efficient, and resilient cities. Our
              interdisciplinary team of energy experts, data scientists, and
              urban planners works together to solve complex energy challenges.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-100 relative overflow-hidden group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 opacity-0 group-hover:opacity-20 blur rounded-xl transition-all duration-700"></div>

            <div className="flex items-center mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-full"></div>
              <h3 className="text-xl font-bold ml-4">Why Choose UrbanLoad?</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mt-1">
                  <Zap size={20} className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">
                    Accuracy & Precision
                  </h4>
                  <p className="text-gray-600">
                    Our forecasting models achieve 95%+ accuracy, providing
                    reliable insights for critical decision-making.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mt-1">
                  <Leaf size={20} className="text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">
                    Sustainability Focus
                  </h4>
                  <p className="text-gray-600">
                    Every feature is designed with environmental impact in mind,
                    helping cities reduce their carbon footprint.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mt-1">
                  <Brain size={20} className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">
                    Continuous Innovation
                  </h4>
                  <p className="text-gray-600">
                    Our team of researchers constantly improves our algorithms
                    and adds new features based on the latest energy research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - with engaging call to action */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        {/* Abstract energy wave animations */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg
            className="absolute bottom-0"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white opacity-20"
            ></path>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your City's Energy Future?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join the growing community of forward-thinking cities leveraging
            data for a sustainable tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDashboardClick}
              className="px-8 py-4 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-md group relative overflow-hidden"
            >
              <span className="relative z-10">
                {isSignedIn ? "Go to Dashboard" : "Get Started Now"}
              </span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-blue-100 opacity-40 group-hover:animate-shine" />
            </button>

            <button
              onClick={() => scrollToSection("features")}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-10 lg:px-20 bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-semibold text-white">
                  UrbanLoad
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                AI-powered energy forecasting and sustainability intelligence
                for urban environments.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Support Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <p className="text-gray-400 mb-2">info@urbanload.ai</p>
              <p className="text-gray-400">
                123 Energy Avenue
                <br />
                Tech City, TC 10101
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} UrbanLoad Technologies. All
              rights reserved.
            </p>
            <div className="flex space-x-6 justify-center">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
