import { MotionDiv } from './MotionPrimitives.jsx'

const faqs = [
  {
    q: 'What is recall?',
    a: 'A correction or removal action taken by a manufacturer to address a problem with a medical device. Recalls occur when a medical device is defective, when it could be a risk to health, or when it is both defective and a risk to health. A medical device recall does not always mean that a patient must stop using the product or return it to the company. A recall sometimes means that the medical device needs to be checked, adjusted, or fixed.'
  },
  {
    q: 'What are recall classes?',
    a: 'Class I: A situation where there is a reasonable chance that a product will cause serious health problems or death.Class II: A situation where a product may cause a temporary or reversible health problem or where there is a slight chance that it will cause serious health problems or death. Class III: A situation where a product is not likely to cause any health problem or injury.'
  },
  {
    q: 'What is safety alerts?',
    a: 'Alerts provide important information and recommendations about products. Even though an alert has been issued, it does not necessarily mean a product is considered to be unsafe. Safety Alerts, addressed to health workers and users, may include recalls. They can be written by manufacturers, but also by health officials.'
  },
  {
    q: 'What is Field Safety Notice?',
    a: 'Field safety notices are communications sent out by medical device manufacturers or their representatives in relation to actions that they may be taking in relation to their product that is on the market. These are mainly for health workers, but also for users. They can include recalls and alerts.'
  },
]

export default function FAQ() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">FAQs</h2>
      <div className="space-y-3">
        {faqs.map((item, idx) => (
          <MotionDiv key={idx} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="rounded-xl border border-slate-200 p-4">
            <div className="font-medium text-slate-900">{item.q}</div>
            <p className="text-sm text-slate-600 mt-1">{item.a}</p>
          </MotionDiv>
        ))}
      </div>
    </div>
  )
}


