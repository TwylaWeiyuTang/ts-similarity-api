import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import Button, { buttonVariants } from "./ui/Button";
import Link from "next/link";

const MenuOptions: FC = ({}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-2 items-center">Menu</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link className={buttonVariants({ variant: "link" })} href="/login">
            Sign In
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            className={buttonVariants({ variant: "link" })}
            href="/documentation"
          >
            Documentation
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            className={buttonVariants({ variant: "link" })}
            href="/dashboard"
          >
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            className={buttonVariants({ variant: "link" })}
            href="/playground"
          >
            Playground
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuOptions;
