import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-36 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute left-0 h-20 md:h-32 lg:h-40 bg-[#D0E6E7] rounded-r-full md:rounded-r-[3rem] lg:rounded-r-[6rem] hidden lg:block" style={{left: 'calc(100% - 100vw)', width: 'calc(-100% + 16rem + 100vw)', bottom: '25%', transform: 'translateY(-50%)'}}></div>
      <div className="absolute right-0 h-16 md:h-24 lg:h-32 bg-[#D0E6E7] rounded-l-full md:rounded-l-[3rem] lg:rounded-l-[6rem] hidden lg:block" style={{right: 'calc(100% - 100vw)', width: 'calc(-100% + 12rem + 100vw)', top: '22%', transform: 'translateY(50%)'}}></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-[#163F69] mb-6" style={{ fontFamily: 'var(--font-neulis)' }}>
            Terms of Use
          </h1>
          <p className="text-lg text-[#163F69]/70 max-w-2xl mx-auto">
            Welcome to our website. By accessing or using this service, you agree to the following terms and conditions.
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-12">
          {/* General Conditions */}
          <section>
            <h2 className="text-3xl font-bold text-[#163F69] mb-6" style={{ fontFamily: 'var(--font-neulis)' }}>
              General Conditions
            </h2>
            <p className="text-lg text-[#163F69]/70 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-3xl font-bold text-[#163F69] mb-6" style={{ fontFamily: 'var(--font-neulis)' }}>
              User Responsibilities
            </h2>
            <p className="text-lg text-[#163F69]/70 leading-relaxed">
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
          </section>

          {/* Privacy & Data Protection */}
          <section>
            <h2 className="text-3xl font-bold text-[#163F69] mb-6" style={{ fontFamily: 'var(--font-neulis)' }}>
              Privacy & Data Protection
            </h2>
            <p className="text-lg text-[#163F69]/70 leading-relaxed">
              Curabitur blandit tempus porttitor. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibendum nulla sed consectetur.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-3xl font-bold text-[#163F69] mb-6" style={{ fontFamily: 'var(--font-neulis)' }}>
              Limitation of Liability
            </h2>
            <p className="text-lg text-[#163F69]/70 leading-relaxed">
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas sed diam eget risus varius blandit sit amet non magna.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-3xl font-bold text-[#163F69] mb-6" style={{ fontFamily: 'var(--font-neulis)' }}>
              Changes to Terms
            </h2>
            <p className="text-lg text-[#163F69]/70 leading-relaxed">
              Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
          </section>

          {/* Contact Information */}
          <section className="pb-6">
            <p className="text-lg text-[#163F69]/70 leading-relaxed">
              If you have any questions about these Terms of Use, please{' '}
              <Link href="/contact" className="text-[#163F69] font-semibold hover:text-[#163F69]/80 transition-colors">
                contact us
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
