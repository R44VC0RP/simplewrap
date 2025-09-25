export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-semibold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground font-medium tracking-tight-4">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4 font-medium tracking-tight-4">
              Permission is granted to temporarily download one copy of the materials on EXON ENTERPRISE LLC's website for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 font-medium tracking-tight-4">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>attempt to decompile or reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              The materials on EXON ENTERPRISE LLC's website are provided on an 'as is' basis. EXON ENTERPRISE LLC makes no warranties, 
              expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties 
              or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">4. Limitations</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              In no event shall EXON ENTERPRISE LLC or its suppliers be liable for any damages (including, without limitation, damages for 
              loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on 
              EXON ENTERPRISE LLC's website, even if EXON ENTERPRISE LLC or an authorized representative has been notified orally or in writing 
              of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations 
              of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">5. Accuracy of Materials</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              The materials appearing on EXON ENTERPRISE LLC's website could include technical, typographical, or photographic errors. 
              EXON ENTERPRISE LLC does not warrant that any of the materials on its website are accurate, complete, or current. 
              EXON ENTERPRISE LLC may make changes to the materials contained on its website at any time without notice. 
              However, EXON ENTERPRISE LLC does not make any commitment to update the materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">6. Links</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              EXON ENTERPRISE LLC has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. 
              The inclusion of any link does not imply endorsement by EXON ENTERPRISE LLC of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">7. Modifications</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              EXON ENTERPRISE LLC may revise these terms of service for its website at any time without notice. 
              By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably 
              submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">9. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed font-medium tracking-tight-4">
              If you have any questions about these Terms of Service, please contact EXON ENTERPRISE LLC through our website contact form.
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
