import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective  {
    @HostBinding('class.show') isOpen = false
    @Input('dropdownOpenClass') dropdownOpenClass = ""

    constructor(private elRef: ElementRef, private renderer: Renderer2){}

    @HostListener('click')
    toggleOpen(){
        this.isOpen = !this.isOpen
        let dropdown = this.elRef.nativeElement.querySelector('.dropdown-menu')
        if (this.isOpen) {
            if(this.dropdownOpenClass) this.renderer.addClass(dropdown, this.dropdownOpenClass)
            this.renderer.addClass(dropdown, "show")
        }else{
            this.renderer.removeClass(dropdown, "show")
            if(this.dropdownOpenClass) this.renderer.removeClass(dropdown, this.dropdownOpenClass)
        }
    }
    

}