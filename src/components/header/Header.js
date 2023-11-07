import { ExcelComponent } from "@/core/ExcelComponent";

export class Header extends ExcelComponent {
    static className = 'excel__header'
    toHTML(){
        return `<input type="text" class="input" value="Новая таблица"/>          
        <div class="button">
            <i class="material_icons">delete</i>
        </div>
        <div class="button">
            <i class="material_icons">exit_to_app</i>
        </div>`
    }
}