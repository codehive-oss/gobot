import LinkComponent from "../LinkComponent";
import ExternalLinkComponent from "../ExternalLinkComponent";

type NavbarButtonsProps = React.HTMLAttributes<HTMLDivElement>;

const NavbarButtons: React.FC<NavbarButtonsProps> = ({ className }) => {
  return (
    <>
      <ExternalLinkComponent
        className={className}
        href={
          "https://discord.com/oauth2/authorize?client_id=907449509133561888&permissions=8&scope=bot%20applications.commands"
        }
      >
        Invite
      </ExternalLinkComponent>
      <LinkComponent className={className} href="/commands">
        Commands
      </LinkComponent>
      <LinkComponent className={className} href="/dashboard">
        Dashboard
      </LinkComponent>
      <LinkComponent className={className} href="/donate">
        Donate
      </LinkComponent>
      <LinkComponent className={className} href="/vote">
        Vote
      </LinkComponent>
      <LinkComponent className={className} href="/team">
        Team
      </LinkComponent>
    </>
  );
};

export default NavbarButtons;
