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

            <a href={href} target="_blank">{children}</a>
        </div>
    );
};

export default ExtenalLinkComponent;
