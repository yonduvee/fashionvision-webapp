
import { useEffect, useState } from "react"
import { Upload, ExternalLink } from "lucide-react"
import "./App.css"
import ModelComparison from "./components/ModelComparison"
import Results from "./components/Results"
import About from "./components/About"
import heroImage from "./assets/Neural Fashion AI Sneaker Showcase.png"

const API_URL = "https://fashionvision-webapp.onrender.com"

const SAMPLE_IMAGES_URL =
  "https://drive.google.com/drive/folders/1_t0ezhTUaGKYbslqU9VGXufE5JnN5C9s?usp=sharing"

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [modelInputImage, setModelInputImage] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [confidence, setConfidence] = useState(0)
  const [topPredictions, setTopPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage)
      }
    }
  }, [selectedImage])

  const generateModelInputPreview = (file) => {
    const reader = new FileReader()

    reader.onload = () => {
      const image = new Image()

      image.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = 28
        canvas.height = 28

        const ctx = canvas.getContext("2d")

        if (!ctx) return

        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, 28, 28)

        const scale = Math.min(
          28 / image.width,
          28 / image.height
        )

        const width = image.width * scale
        const height = image.height * scale

        ctx.drawImage(
          image,
          (28 - width) / 2,
          (28 - height) / 2,
          width,
          height
        )

        const imageData = ctx.getImageData(0, 0, 28, 28)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3] / 255

          const red = data[i] * alpha
          const green = data[i + 1] * alpha
          const blue = data[i + 2] * alpha

          const gray =
            0.299 * red +
            0.587 * green +
            0.114 * blue

          data[i] = gray
          data[i + 1] = gray
          data[i + 2] = gray
          data[i + 3] = 255
        }

        ctx.putImageData(imageData, 0, 0)

        setModelInputImage(canvas.toDataURL("image/png"))
      }

      image.onerror = () => {
        setError("Unable to process the selected image.")
      }

      image.src = reader.result
    }

    reader.onerror = () => {
      setError("Unable to read the selected image.")
    }

    reader.readAsDataURL(file)
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    const allowedTypes = [
      "image/png",
      "image/jpeg"
    ]

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a PNG, JPG, or JPEG image.")
      event.target.value = ""
      return
    }

    setSelectedFile(file)
    setFileName(file.name)
    setSelectedImage(URL.createObjectURL(file))
    setModelInputImage(null)
    setPrediction(null)
    setConfidence(0)
    setTopPredictions([])
    setError("")

    generateModelInputPreview(file)

    event.target.value = ""
  }

  const handlePrediction = async () => {
    if (!selectedFile) {
      setError("Please choose an image first.")
      return
    }

    setLoading(true)
    setError("")
    setPrediction(null)
    setConfidence(0)
    setTopPredictions([])

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        throw new Error("Prediction failed")
      }

      const data = await response.json()

      setPrediction(data.prediction ?? null)
      setConfidence(Number(data.confidence) || 0)

      setTopPredictions(
        Array.isArray(data.top_predictions)
          ? data.top_predictions
          : []
      )
    } catch {
      setError(
        "Could not connect to the prediction server. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  const limitPercentage = (value) => {
    return Math.max(
      0,
      Math.min(Number(value) || 0, 100)
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <a
            href="#home"
            className="flex items-center gap-3"
          >
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
          className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-20"
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                CNN Image Classification Project
              </div>

              <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Fashion Image Classification with{" "}
                <span className="text-blue-600">
                  Deep Learning
                </span>
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                A deep learning project that compares a fully
                connected neural network with a Convolutional
                Neural Network for Fashion-MNIST image
                classification.
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

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
                  <p className="text-xl font-bold text-blue-600 sm:text-2xl">
                    10
                  </p>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Fashion Classes
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
                  <p className="text-xl font-bold text-blue-600 sm:text-2xl">
                    28×28
                  </p>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Image Size
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
                  <p className="text-xl font-bold text-blue-600 sm:text-2xl">
                    90.41%
                  </p>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    CNN Accuracy
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl transition-all hover:shadow-2xl">
                <img
                  src={heroImage}
                  alt="Neural Fashion AI Sneaker Showcase"
                  className="h-auto w-full max-w-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="demo"
          className="border-t border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Live Demo
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Try the CNN Model
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Upload a fashion image and see how the model
                classifies it.
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3">
                <a
                  href={SAMPLE_IMAGES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <ExternalLink size={18} />
                  View Sample Images
                </a>

                <p className="text-sm text-slate-500">
                  Not sure which image to upload?
                  Explore our sample fashion images.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
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

                  <p className="mt-2 max-w-full break-all text-sm text-slate-500">
                    {fileName || "PNG, JPG or JPEG"}
                  </p>

                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>

                <button
                  type="button"
                  onClick={handlePrediction}
                  disabled={!selectedFile || loading}
                  className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {loading
                    ? "Analyzing Image..."
                    : "Predict Image"}
                </button>

                {error && (
                  <p
                    role="alert"
                    className="mt-4 text-sm font-medium text-red-600"
                  >
                    {error}
                  </p>
                )}

                <div className="mt-5 rounded-2xl bg-blue-50 p-4">
                  <p className="text-sm leading-6 text-blue-800">
                    For best results, use a single clothing
                    item with a simple background.
                  </p>

                  <a
                    href={SAMPLE_IMAGES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800"
                  >
                    Browse Example Images
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
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

                    <div className="mt-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-900 p-4">
                      {modelInputImage ? (
                        <img
                          src={modelInputImage}
                          alt="28 by 28 grayscale model input preview"
                          className="h-full w-full object-contain"
                          style={{
                            imageRendering: "pixelated"
                          }}
                        />
                      ) : (
                        <span className="text-center text-sm text-slate-400">
                          28 × 28 grayscale image
                        </span>
                      )}
                    </div>

                    {modelInputImage && (
                      <p className="mt-3 text-center text-xs text-slate-500">
                        28 × 28 Grayscale Preview
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Predicted Class
                  </p>

                  <p className="mt-2 break-words text-3xl font-bold text-slate-900">
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
                          width: `${limitPercentage(confidence)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {topPredictions.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                    <h4 className="font-semibold text-slate-900">
                      Top 3 Predictions
                    </h4>

                    <div className="mt-5 space-y-4">
                      {topPredictions.slice(0, 3).map((item, index) => (
                        <div
                          key={`${item.class}-${index}`}
                        >
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="font-medium text-slate-700">
                              {item.class}
                            </span>

                            <span className="font-semibold text-slate-800">
                              {(Number(item.confidence) || 0).toFixed(2)}%
                            </span>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-blue-500"
                              style={{
                                width: `${limitPercentage(
                                  item.confidence
                                )}%`
                              }}
                            />
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
