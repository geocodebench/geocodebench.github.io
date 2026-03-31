import RichText from '../components/RichText';

import FigCase1 from '../assets/cases/FigCase1.png';
import FigCase2 from '../assets/cases/FigCase2.png';
import FigCase3 from '../assets/cases/FigCase3.png';

const CaseStudies = () => {
  const caseSections = [
    {
      id: 'case_1',
      eyebrow: 'Common Failures',
      title: 'Consistent Failure Across LLMs on a Simple Function',
      figure: FigCase1,
      figureAlt: 'Case study figure: consistent failure across LLMs',
      description: String.raw`\textbf{Case Study: Consistent Failure Across LLMs on a Simple Function.}
    The function {forward\_event} approximates “event accumulation” using the logarithmic intensity difference derived from two event-camera frames. Despite its brevity and simplicity, all tested LLMs failed.`,
    },
    {
      id: 'case_2',
      eyebrow: 'Creative Correctness',
      title: 'Creative Correctness',
      figure: FigCase2,
      figureAlt: 'Case study figure: creative correctness in epipolar distance',
      description: String.raw`\textbf{Case Study: Creativity Correctness.} The function {compute\_epipolar\_distance} requires calculating the symmetric epipolar distance between corresponding image points $\mathbf{p}_1$ and $\mathbf{p}_2$ given $T_{21}$ and $\mathbf{K}$.
    GPT-5 uses the Fundamental Matrix ($\mathbf{F}$) method ($\mathbf{l}_2 = \mathbf{F}\mathbf{p}_1$), operating directly on pixel coordinates.
    DeepSeek-R1, conversely, first transforms the inputs to normalized coordinates ($\mathbf{x}_1, \mathbf{x}_2$) and then applies the Essential Matrix ($\mathbf{E}$) method ($\mathbf{l}'_2 = \mathbf{E}\mathbf{x}_1$).
    Both approaches are mathematically equivalent ($\mathbf{F} = \mathbf{K}^{-T} \mathbf{E} \mathbf{K}^{-1}$) and yield the correct final distance, thus demonstrating \textbf{Creative Correctness}: models select distinct, valid pathways to achieve the required $3\text{D}$ geometry constraint.`,
    },
    {
      id: 'case_3',
      eyebrow: 'Research Capability',
      title: 'Divergence between General and Research Capability',
      figure: FigCase3,
      figureAlt: 'Case study figure: divergence between general and research capability',
      description: String.raw`\textbf{Case Study: Divergence between General and Research Capability.} 
        Left: DeepSeek-R1 correctly solves the basic geometric problem of mapping 2D image coordinates to 3D spherical coordinates using trigonometric functions, demonstrating strong foundational knowledge. 
        Right: In contrast, the model fails to correctly implement the paper-specific function {cross\_warp\_with\_pose\_depth\_candidates}. The error involves misinterpreting the required mutual projection logic (Yin $\leftrightarrow$ Yang) as separate projections, highlighting the difficulty LLMs face in procedural reasoning and fine-grained algorithmic synthesis based on paper content.`,
    },
  ];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.16),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.12),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
            Case Studies
          </h1>
          {/* <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
            Case studies of where LLMs fail.
          </p> */}
        </div>

        <div className="space-y-10">
          {caseSections.map((cs, idx) => {
            const imageFirst = idx % 2 === 0;
            return (
              <section
                key={cs.id}
                className="rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div
                    className={[
                      'lg:col-span-7 p-5 sm:p-7',
                      imageFirst ? 'order-1' : 'order-2 lg:order-1',
                    ].join(' ')}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                      <img
                        src={cs.figure}
                        alt={cs.figureAlt}
                        className="h-auto w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div
                    className={[
                      'lg:col-span-5 p-5 sm:p-7',
                      imageFirst ? 'order-2' : 'order-1 lg:order-2',
                    ].join(' ')}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                          {cs.eyebrow}
                        </div>
                        <h2 className="mt-2 text-xl font-semibold text-gray-900">
                          {cs.title}
                        </h2>
                      </div>
                    </div>

                    <div className="mt-4">
                      <RichText text={cs.description} className="space-y-3" />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;

