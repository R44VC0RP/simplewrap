export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-semibold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground font-medium tracking-tight-4">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4 mb-4 font-medium tracking-tight-4">
              EXON ENTERPRISE LLC collects information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support.
            </p>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 font-medium tracking-tight-4 mb-4 font-medium tracking-tight-4">
              <li>Name and email address</li>
              <li>Account credentials</li>
              <li>Profile information</li>
              <li>Communications with us</li>
            </ul>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Usage Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 font-medium tracking-tight-4 font-medium tracking-tight-4">
              <li>Device information and identifiers</li>
              <li>Log data and usage patterns</li>
              <li>Location information (if permitted)</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4 mb-4">
              We use the information we collect to provide, maintain, and improve our services. Specifically, we use your information to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 font-medium tracking-tight-4">
              <li>Provide and deliver the services you request</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve the services and provide content or features that match user profiles or interests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">3. Information Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
            </p>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Service Providers</h3>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4 mb-4">
              We may share your information with third-party service providers who perform services on our behalf, such as payment processing, 
              data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </p>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Legal Requirements</h3>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              We may disclose your information if required to do so by law or in response to valid requests by public authorities, 
              such as a court or government agency.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, 
              so we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              We retain your personal information for as long as necessary to provide our services, comply with legal obligations, 
              resolve disputes, and enforce our agreements. When we no longer need your personal information, we will securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">6. Your Rights and Choices</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4 mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 font-medium tracking-tight-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Withdrawal of consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              We use cookies and similar tracking technologies to collect and use personal information about you. 
              You can control cookies through your browser settings and other tools. However, if you block or delete cookies, 
              some features of our services may not work properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">8. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              Our services may contain links to third-party websites or services. We are not responsible for the privacy practices 
              or content of these third parties. We encourage you to review the privacy policies of any third-party services you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. 
              If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">10. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              Your information may be transferred to and processed in countries other than your own. 
              We will take appropriate measures to ensure that your personal information receives an adequate level of protection 
              in the jurisdictions in which we process it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact EXON ENTERPRISE LLC through our website contact form. 
              We will respond to your inquiry within a reasonable timeframe.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground font-medium tracking-tight-4">
            © {new Date().getFullYear()} EXON ENTERPRISE LLC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
