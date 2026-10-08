import { useState } from "react"
import {
  Upload,
  BrainCircuit,
  BarChart3,
  Grid3X3,
  ArrowRight,
} from "lucide-react"
import ModelComparison from "./components/ModelComparison"
import Results from "./components/Results"
import About from "./components/About"

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [prediction, setPrediction] = useState(null)
  const [confidence, setConfidence] = useState(0)
  const [topPredictions, setTopPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const apiUrl = "https://fashionvision-webapp.onrender.com"

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (!file) return

    setSelectedFile(file)
    setFileName(file.name)
    setSelectedImage(URL.createObjectURL(file))
    setPrediction(null)
    setConfidence(0)
    setTopPredictions([])
    setError("")
  }

  const handlePrediction = async () => {
    if (!selectedFile) {
      setError("Please choose an image first.")
      return
    }

    setLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Prediction failed")
      }

      const data = await response.json()

      setPrediction(data.prediction)
      setConfidence(data.confidence)
      setTopPredictions(data.top_predictions)
    } catch {
      setError("Could not connect to the prediction server.")
    } finally {
      setLoading(false)
    }
  }

  const featureCards = [
    {
      title: "Image Upload",
      description: "Upload a fashion image for prediction.",
      icon: Upload,
      href: "#demo",
      link: "Go to demo",
    },
    {
      title: "CNN Prediction",
      description: "Get the predicted class and confidence score.",
      icon: BrainCircuit,
      href: "#demo",
      link: "Try prediction",
    },
    {
      title: "Model Comparison",
      description: "Compare Dense Network and CNN performance.",
      icon: BarChart3,
      href: "#comparison",
      link: "View comparison",
    },
    {
      title: "Visual Results",
      description: "Explore confusion matrix and training results.",
      icon: Grid3X3,
      href: "#results",
      link: "View results",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              FV
            </div>

            <div>
              <h1 className="text-lg font-bold">
                FashionVision AI
              </h1>

              <p className="text-xs text-slate-500">
                Deep Learning Image Classifier
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              Home
            </a>

            <a
              href="#demo"
              className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              Live Demo
            </a>

            <a
              href="#comparison"
              className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              Model Comparison
            </a>

            <a
              href="#results"
              className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              Results
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              About
            </a>
          </nav>

          <a
            href="#demo"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Try Model
          </a>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2"
        >
          <div>
            <div className="mb-5 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              CNN Image Classification Project
            </div>

            <h2 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Fashion Image Classification with{" "}
              <span className="text-blue-600">
                Deep Learning
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A deep learning project that compares a fully connected neural
              network with a Convolutional Neural Network for Fashion-MNIST
              image classification.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#demo"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Try Live Prediction
              </a>

              <a
                href="#comparison"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
              >
                View Model Results
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-blue-600">
                  10
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Fashion Classes
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-blue-600">
                  28×28
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Image Size
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-blue-600">
                  CNN
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Best Model
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {featureCards.map((item) => {
                    const Icon = item.icon

                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Icon size={23} />
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>

                        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600">
                          <span>{item.link}</span>
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="demo"
          className="border-t border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Live Demo
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Try the CNN Model
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Upload a fashion image and see how the model classifies it.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-semibold">
                  Upload Image
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Choose a clothing image for prediction.
                </p>

                <label className="mt-6 flex min-h-80 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-white px-6 text-center transition hover:border-blue-500 hover:bg-blue-50">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <Upload size={28} />
                  </div>

                  <p className="mt-5 text-lg font-semibold text-slate-800">
                    Choose an image
                  </p>

                  <p className="mt-2 max-w-sm truncate text-sm text-slate-500">
                    {fileName || "PNG, JPG or JPEG"}
                  </p>

                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>

                <button
                  onClick={handlePrediction}
                  disabled={!selectedFile || loading}
                  className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {loading ? "Analyzing Image..." : "Predict Image"}
                </button>

                {error && (
                  <p className="mt-4 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                <div className="mt-5 rounded-2xl bg-blue-50 p-4">
                  <p className="text-sm leading-6 text-blue-800">
                    For best results, use a single clothing item with a simple
                    background.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Prediction Result
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Your model result will appear here.
                    </p>
                  </div>

                  <div className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    CNN Model
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-600">
                      Original Image
                    </p>

                    <div className="mt-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-200">
                      {selectedImage ? (
                        <img
                          src={selectedImage}
                          alt="Uploaded fashion item"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-sm text-slate-500">
                          Image preview
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-600">
                      Model Input
                    </p>

                    <div className="mt-4 flex aspect-square items-center justify-center rounded-xl bg-slate-900 px-6 text-center text-sm text-slate-400">
                      28 × 28 grayscale image
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Predicted Class
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {prediction || "Waiting for image"}
                  </p>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-600">
                        Confidence
                      </span>

                      <span className="font-semibold text-slate-800">
                        {confidence.toFixed(2)}%
                      </span>
                    </div>

                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{
                          width: `${Math.min(confidence, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {topPredictions.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                    <h4 className="font-semibold text-slate-900">
                      Top 3 Predictions
                    </h4>

                    <div className="mt-5 space-y-4">
                      {topPredictions.map((item) => (
                        <div key={item.class}>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-700">
                              {item.class}
                            </span>

                            <span className="font-semibold text-slate-800">
                              {item.confidence.toFixed(2)}%
                            </span>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-blue-500"
                              style={{
                                width: `${Math.min(
                                  item.confidence,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <ModelComparison />

        <Results />

        <About />
      </main>
    </div>
  )
}

export default App