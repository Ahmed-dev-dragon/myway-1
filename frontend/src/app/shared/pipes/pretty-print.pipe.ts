import { Pipe, PipeTransform } from "@angular/core";

function prettyPrintFunction(string: string) {
  let spaces = 0;
  let str = "";
  for (let s of string) {
    if (["}", "]"].includes(s))
      str += `<br/>${Array((spaces -= 6)).join("&nbsp;")}`;

    str += s;

    if (["{", "["].includes(s))
      str += `<br/>${Array((spaces += 6)).join("&nbsp;")}`;
    else if (s == ",") str += `<br/>${Array(spaces).join("&nbsp;")}`;
  }

  return str;
}

@Pipe({
  name: "prettyPrint",
})
export class PrettyPrintPipe implements PipeTransform {
  transform(val: any) {
    if (typeof val == "string" && val != "{}") {
      val = prettyPrintFunction(val);

      return val
        .replace(/"(\w+)"\s*:/g, "<span class=>$1</span>:")
        .replace(
          /("((?:\\.|[^"\\])*)")/g,
          '<span class="object-value-string">$1</span>'
        )
        .replace(/class=>/g, 'class="object-key">')
        .replace(
          /\s*(true|false)\s*/g,
          '<span class="object-value-number-boolean">$1</span>'
        )
        .replace(
          /(>\s*:\s*)(\d+)/g,
          '$1<span class="object-value-number-boolean">$2</span>'
        );
    }
    return val;
  }
}
