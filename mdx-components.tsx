import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // table: (props) => (
    //   <table className="border-collapse border-spacing-0 w-full" {...props} />
    // ),
    // thead: (props) => (
    //   <thead
    //     className="[&>tr]:h-12 [&>tr>th]:py-0 [&>tr>th]:align-middle [&>tr>th]:bg-default-400/20 dark:[&>tr>th]:bg-default-600/10 [&>tr>th]:text-default-600 [&>tr>th]:text-xs [&>tr>th]:text-left [&>tr>th]:pl-2 [&>tr>th:first-child]:rounded-l-lg [&>tr>th:last-child]:rounded-r-lg"
    //     {...props}
    //   />
    // ),
    // td: (props) => (
    //   <td
    //     className="text-sm p-2 max-w-[200px] overflow-auto whitespace-normal break-normal"
    //     {...props}
    //   />
    // ),
    img: (props) => {
      const { src, alt, ...rest } = props as ImageProps;
      return <Image alt={alt} src={src} sizes="100vw" {...rest} />;
    },
    ...components,
  };
}
