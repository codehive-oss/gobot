import React from "react";

type ExternalLinkComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  href: string;
};

const ExtenalLinkComponent: React.FC<ExternalLinkComponentProps> = ({
  children,
  href,
  className,
}) => {
  return (
    <div className={className}>
      <a href={href}>{children}</a>
    </div>
  );
};

export default ExtenalLinkComponent;
