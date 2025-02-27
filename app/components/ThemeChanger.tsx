import { useFetcher } from "react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import { useRootLoaderData } from "~/hooks/useRootLoaderData";

export default function ThemeChanger() {
  const fetcher = useFetcher<never>();
  const { currentTheme } = useRootLoaderData();
  const { toast } = useToast();

  useEffect(() => {
    const theme = fetcher.formData?.get("theme");

    if (typeof theme === "string" && fetcher.state === "loading") {
      toast({ title: `Theme changed to ${theme}` });
    }
  }, [fetcher.formData, fetcher.state, toast]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <fetcher.Form action="/theme" method="post">
          <button className="contents" type="submit" name="theme" value="light">
            <DropdownMenuCheckboxItem checked={currentTheme === "light"}>
              Light
            </DropdownMenuCheckboxItem>
          </button>
          <button className="contents" type="submit" name="theme" value="dark">
            <DropdownMenuCheckboxItem checked={currentTheme === "dark"}>
              Dark
            </DropdownMenuCheckboxItem>
          </button>
          <button
            className="contents"
            type="submit"
            name="theme"
            value="system"
          >
            <DropdownMenuCheckboxItem checked={currentTheme === "system"}>
              System
            </DropdownMenuCheckboxItem>
          </button>
        </fetcher.Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
