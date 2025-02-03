import { Card, CardContent } from "~/components/ui/card";
import { NewsletterForm } from "~/components/newsletter-form";

export function InfoCard() {
  return (
    <Card className="h-fit">
      <CardContent className="p-4 sm:pt-6">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div>
            <h3 className="font-semibold">How It Works</h3>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <p>• Winning projects are scraped from Devpost</p>
              <p>• View demos, images, source code, and more</p>
              <p>• Get inspired and learn from successful projects</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Subscribe to the newsletter to get the latest winning hackathon
              projects delivered straight to your inbox! I&apos;ll also let you
              know when I add new features.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
