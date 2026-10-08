function Results() {
  const charts = [
    {
      title: "Dense Model Accuracy",
      description: "Training and validation accuracy of the baseline neural network.",
      image: "/results/dense_accuracy.png",
    },
    {
      title: "CNN Model Accuracy",
      description: "Training and validation accuracy of the convolutional neural network.",
      image: "/results/cnn_accuracy.png",
    },
    {
      title: "Dense Model Loss",
      description: "Training and validation loss across the dense model epochs.",
      image: "/results/dense_loss.png",
    },
    {
      title: "CNN Model Loss",
      description: "Training and validation loss across the CNN training epochs.",
      image: "/results/cnn_loss.png",
    },
  ]

  return (
    <section
      id="results"
      className="border-t border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Model Results
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Training and Evaluation Results
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Visual results from the Dense Neural Network and CNN trained on the
            Fashion-MNIST dataset.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {charts.map((chart) => (
            <div
              key={chart.title}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  {chart.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {chart.description}
                </p>
              </div>

              <div className="border-t border-slate-200 bg-white p-5">
                <img
                  src={chart.image}
                  alt={chart.title}
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    CNN EVALUATION
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Confusion Matrix
                  </h3>
                </div>

                <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  10 Classes
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                The confusion matrix shows how often the CNN correctly
                classified each Fashion-MNIST category and where the model made
                mistakes.
              </p>
            </div>

            <div className="border-t border-slate-200 bg-white p-5">
              <img
                src="/results/cnn_confusion_matrix.png"
                alt="CNN confusion matrix"
                className="w-full rounded-2xl"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-orange-600">
                    MODEL ERRORS
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Misclassified Images
                  </h3>
                </div>

                <div className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                  5 Examples
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                These examples show images where the CNN prediction did not
                match the actual Fashion-MNIST label.
              </p>
            </div>

            <div className="border-t border-slate-200 bg-white p-5">
              <img
                src="/results/misclassified_images.png"
                alt="CNN misclassified examples"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-7">
          <h3 className="text-xl font-bold text-slate-900">
            What the results show
          </h3>

          <p className="mt-3 max-w-5xl leading-7 text-slate-600">
            The CNN performs better because convolutional layers learn useful
            visual patterns while preserving spatial information. Most errors
            occur between clothing categories with similar shapes, such as
            shirts, pullovers and coats.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Results