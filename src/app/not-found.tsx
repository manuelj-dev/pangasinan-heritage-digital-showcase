import Link from "next/link";
import { Heading, Text } from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center md:px-6">
      <Heading level={1}>Page not found</Heading>
      <Text muted className="mt-4">
        The heritage site or page you&apos;re looking for doesn&apos;t exist.
      </Text>
      <div className="mt-6">
        <Button href="/">Back to homepage</Button>
      </div>
    </div>
  );
}
