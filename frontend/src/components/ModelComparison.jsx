function ModelComparison() {
  return (
    <section
      id="comparison"
      className="border-t border-slate-200 bg-slate-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Model Comparison
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Dense Network vs CNN
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Comparing the baseline fully connected neural network with the
            convolutional neural network used for Fashion-MNIST classification.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  BASELINE MODEL
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Dense Neural Network
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-lg font-bold text-slate-700">
                NN
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  Test Accuracy
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  —
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  Parameters
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  —
                </p>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-sm font-semibold text-slate-700">
                Architecture
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-lg bg-slate-100 px-3 py-2">
                  Flatten
                </span>

                <span className="text-slate-400">→</span>

                <span className="rounded-lg bg-slate-100 px-3 py-2">
                  Dense 128
                </span>

                <span className="text-slate-400">→</span>

                <span className="rounded-lg bg-slate-100 px-3 py-2">
                  Dense 64
                </span>

                <span className="text-slate-400">→</span>

                <span className="rounded-lg bg-slate-100 px-3 py-2">
                  Softmax
                </span>
              </div>
            </div>

            <p className="mt-7 leading-7 text-slate-600">
              The dense network converts every image into a one-dimensional
              vector before classification. This makes it a useful baseline,
              but it does not directly preserve spatial relationships between
              nearby pixels.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-white p-7 shadow-sm">
            <div className="absolute right-0 top-0 rounded-bl-2xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white">
              Best Model
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  CONVOLUTIONAL MODEL
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  CNN
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">
                CNN
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-blue-50 p-5">
                <p className="text-sm text-blue-700">
                  Test Accuracy
                </p>

                <p className="mt-2 text-3xl font-bold text-blue-700">
                  —
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-5">
                <p className="text-sm text-blue-700">
                  Parameters
                </p>

                <p className="mt-2 text-3xl font-bold text-blue-700">
                  —
                </p>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-sm font-semibold text-slate-700">
                Architecture
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-lg bg-blue-50 px-3 py-2">
                  Conv2D
                </span>

                <span className="text-slate-400">→</span>

                <span className="rounded-lg bg-blue-50 px-3 py-2">
                  Pooling
                </span>

                <span className="text-slate-400">→</span>

                <span className="rounded-lg bg-blue-50 px-3 py-2">
                  Conv2D
                </span>

                <span className="text-slate-400">→</span>

                <span className="rounded-lg bg-blue-50 px-3 py-2">
                  Pooling
                </span>

                <span className="text-slate-400">→</span>

                <span className="rounded-lg bg-blue-50 px-3 py-2">
                  Dense
                </span>
              </div>
            </div>

            <p className="mt-7 leading-7 text-slate-600">
              The CNN learns visual features directly from the image. Its
              convolutional layers can detect useful patterns such as edges,
              shapes and textures while keeping spatial information.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                DATASET
              </p>

              <p className="mt-2 text-xl font-bold">
                Fashion-MNIST
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                28×28 grayscale clothing images
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                CLASSES
              </p>

              <p className="mt-2 text-xl font-bold">
                10 Categories
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Clothing, footwear and accessories
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                FRAMEWORK
              </p>

              <p className="mt-2 text-xl font-bold">
                TensorFlow / Keras
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Deep learning model training and inference
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModelComparison