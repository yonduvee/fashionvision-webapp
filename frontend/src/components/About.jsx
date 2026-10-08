function About() {
  const technologies = [
    "Python",
    "TensorFlow",
    "Keras",
    "CNN",
    "React",
    "Vite",
    "Tailwind CSS",
    "FastAPI",
    "Fashion-MNIST",
  ]

  return (
    <>
      <section
        id="about"
        className="border-t border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              About the Project
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              From Image Classification to a Live AI Application
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              FashionVision AI demonstrates how a trained deep learning model
              can be connected to a real web application and used through a
              simple interactive interface.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 font-bold text-blue-700">
                01
              </div>

              <h3 className="mt-6 text-xl font-bold">
                The Problem
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Manually organizing large numbers of product images can take
                time. Image classification models can help identify visual
                categories automatically and reduce repetitive work.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 font-bold text-green-700">
                02
              </div>

              <h3 className="mt-6 text-xl font-bold">
                The Solution
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                A CNN was trained to recognize ten Fashion-MNIST categories.
                The trained model is connected to this website so users can
                upload an image and receive a predicted class and confidence
                score.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 font-bold text-purple-700">
                03
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Real-World Potential
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Similar systems can support product categorization,
                e-commerce listings, inventory organization and educational
                tools that demonstrate how computer vision models work.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                How It Works
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Prediction Pipeline
              </h3>

              <div className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    1
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Upload an image
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      The user chooses a fashion image from their device.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    2
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Preprocess the image
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      The image is converted into the format expected by the
                      Fashion-MNIST model.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    3
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Run CNN prediction
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      TensorFlow sends the processed image through the trained
                      convolutional neural network.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    4
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Display the result
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      The predicted category, confidence score and top
                      predictions are shown to the user.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Technology
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Tools Used
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                The project combines machine learning, backend development and
                modern frontend development to create a complete end-to-end
                application.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-amber-50 p-5">
                <p className="font-semibold text-amber-900">
                  Model Limitation
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-800">
                  This model was trained on Fashion-MNIST 28×28 grayscale
                  images. It is a proof-of-concept and may not classify
                  complex real-world fashion photographs accurately.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-900 px-8 py-10 text-white md:px-12">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                  Live AI Demo
                </p>

                <h3 className="mt-3 text-3xl font-bold">
                  Try the classifier yourself
                </h3>

                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  Upload an image and explore how the trained CNN responds in
                  real time.
                </p>
              </div>

              <a
                href="#demo"
                className="shrink-0 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Try Prediction
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-white">
              FashionVision AI
            </p>

            <p className="mt-1">
              Deep Learning Image Classification Project
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <a
              href="#home"
              className="transition hover:text-white"
            >
              Home
            </a>

            <a
              href="#demo"
              className="transition hover:text-white"
            >
              Live Demo
            </a>

            <a
              href="#comparison"
              className="transition hover:text-white"
            >
              Models
            </a>

            <a
              href="#results"
              className="transition hover:text-white"
            >
              Results
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default About