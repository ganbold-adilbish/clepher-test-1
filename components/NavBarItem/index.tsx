import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

type NavBarItemChild = {
  id: number;
  title: string;
  path: string;
};

type NavBarItemProps = {
  title: string;
  path: string;
  children?: NavBarItemChild[];
};

export default function NavBarItem(props: NavBarItemProps) {
  const { title, path, children } = props;

  if (!!children) {
    return (
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 px-4 py-2 hover:text-blue-700">
          {title}
          <ChevronDownIcon className="size-4 " />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="py-2 text-sm text-gray-700 font-normal bg-white rounded-lg shadow w-44"
        >
          {children?.map((navbarItemChild) => (
            <MenuItem key={navbarItemChild.id}>
              <Link
                href={`${path}${navbarItemChild.path}`}
                className="flex w-full items-center px-4 py-2 hover:bg-gray-100"
              >
                {navbarItemChild.title}
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    );
  } else {
    return (
      <Link
        href={path}
        className="flex items-center justify-between gap-2 px-4 py-2 hover:text-blue-700"
      >
        {title}
      </Link>
    );
  }
}
