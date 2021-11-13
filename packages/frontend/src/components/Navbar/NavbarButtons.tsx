import LinkComponent from "../LinkComponent";

type NavbarButtonsProps = React.HTMLAttributes<HTMLDivElement>;

const NavbarButtons: React.FC<NavbarButtonsProps> = ({ className }) => {
  return (
    <>
      <LinkComponent className={className} href="/commands">
        Commands
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
