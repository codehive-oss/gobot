import React from "react";
import Link from "next/link";

type LinkComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  href: string;
};

const LinkComponent: React.FC<LinkComponentProps> = ({
  children,
  href,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </div>
  );
};

export default LinkComponent;
