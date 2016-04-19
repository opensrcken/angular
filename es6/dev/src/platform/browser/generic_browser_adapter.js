import { StringMapWrapper } from 'angular2/src/facade/collection';
import { isPresent, isFunction } from 'angular2/src/facade/lang';
import { DomAdapter } from 'angular2/src/platform/dom/dom_adapter';
import { XHRImpl } from 'angular2/src/platform/browser/xhr_impl';
/**
 * Provides DOM operations in any browser environment.
 */
export class GenericBrowserDomAdapter extends DomAdapter {
    constructor() {
        super();
        this._animationPrefix = null;
        this._transitionEnd = null;
        try {
            var element = this.createElement('div', this.defaultDoc());
            if (isPresent(this.getStyle(element, 'animationName'))) {
                this._animationPrefix = '';
            }
            else {
                var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
                for (var i = 0; i < domPrefixes.length; i++) {
                    if (isPresent(this.getStyle(element, domPrefixes[i] + 'AnimationName'))) {
                        this._animationPrefix = '-' + domPrefixes[i].toLowerCase() + '-';
                        break;
                    }
                }
            }
            var transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
            };
            StringMapWrapper.forEach(transEndEventNames, (value, key) => {
                if (isPresent(this.getStyle(element, key))) {
                    this._transitionEnd = value;
                }
            });
        }
        catch (e) {
            this._animationPrefix = null;
            this._transitionEnd = null;
        }
    }
    getXHR() { return XHRImpl; }
    getDistributedNodes(el) { return el.getDistributedNodes(); }
    resolveAndSetHref(el, baseUrl, href) {
        el.href = href == null ? baseUrl : baseUrl + '/../' + href;
    }
    supportsDOMEvents() { return true; }
    supportsNativeShadowDOM() {
        return isFunction(this.defaultDoc().body.createShadowRoot);
    }
    getAnimationPrefix() {
        return isPresent(this._animationPrefix) ? this._animationPrefix : "";
    }
    getTransitionEnd() { return isPresent(this._transitionEnd) ? this._transitionEnd : ""; }
    supportsAnimation() {
        return isPresent(this._animationPrefix) && isPresent(this._transitionEnd);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY19icm93c2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVk0ZE5JSUc3LnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci9nZW5lcmljX2Jyb3dzZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUFjLGdCQUFnQixFQUFDLE1BQU0sZ0NBQWdDO09BQ3JFLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBTyxNQUFNLDBCQUEwQjtPQUM3RCxFQUFDLFVBQVUsRUFBQyxNQUFNLHVDQUF1QztPQUN6RCxFQUFDLE9BQU8sRUFBQyxNQUFNLHdDQUF3QztBQUc5RDs7R0FFRztBQUNILDhDQUF1RCxVQUFVO0lBRy9EO1FBQ0UsT0FBTyxDQUFDO1FBSEYscUJBQWdCLEdBQVcsSUFBSSxDQUFDO1FBQ2hDLG1CQUFjLEdBQVcsSUFBSSxDQUFDO1FBR3BDLElBQUksQ0FBQztZQUNILElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUM3QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxXQUFXLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDL0MsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQzVDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQzt3QkFDakUsS0FBSyxDQUFDO29CQUNSLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLGtCQUFrQixHQUE0QjtnQkFDaEQsZ0JBQWdCLEVBQUUscUJBQXFCO2dCQUN2QyxhQUFhLEVBQUUsZUFBZTtnQkFDOUIsV0FBVyxFQUFFLCtCQUErQjtnQkFDNUMsVUFBVSxFQUFFLGVBQWU7YUFDNUIsQ0FBQztZQUNGLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEtBQWEsRUFBRSxHQUFXO2dCQUN0RSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFFO1FBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLEtBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbEMsbUJBQW1CLENBQUMsRUFBZSxJQUFZLE1BQU0sQ0FBTyxFQUFHLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsaUJBQWlCLENBQUMsRUFBcUIsRUFBRSxPQUFlLEVBQUUsSUFBWTtRQUNwRSxFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQzdELENBQUM7SUFDRCxpQkFBaUIsS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3Qyx1QkFBdUI7UUFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELGtCQUFrQjtRQUNoQixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDdkUsQ0FBQztJQUNELGdCQUFnQixLQUFhLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxpQkFBaUI7UUFDZixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDNUUsQ0FBQztBQUNILENBQUM7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNGdW5jdGlvbiwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7RG9tQWRhcHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge1hIUkltcGx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL3hocl9pbXBsJztcblxuXG4vKipcbiAqIFByb3ZpZGVzIERPTSBvcGVyYXRpb25zIGluIGFueSBicm93c2VyIGVudmlyb25tZW50LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyIGV4dGVuZHMgRG9tQWRhcHRlciB7XG4gIHByaXZhdGUgX2FuaW1hdGlvblByZWZpeDogc3RyaW5nID0gbnVsbDtcbiAgcHJpdmF0ZSBfdHJhbnNpdGlvbkVuZDogc3RyaW5nID0gbnVsbDtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0cnkge1xuICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHRoaXMuZGVmYXVsdERvYygpKTtcbiAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5nZXRTdHlsZShlbGVtZW50LCAnYW5pbWF0aW9uTmFtZScpKSkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb25QcmVmaXggPSAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkb21QcmVmaXhlcyA9IFsnV2Via2l0JywgJ01veicsICdPJywgJ21zJ107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9tUHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZ2V0U3R5bGUoZWxlbWVudCwgZG9tUHJlZml4ZXNbaV0gKyAnQW5pbWF0aW9uTmFtZScpKSkge1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uUHJlZml4ID0gJy0nICsgZG9tUHJlZml4ZXNbaV0udG9Mb3dlckNhc2UoKSArICctJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHRyYW5zRW5kRXZlbnROYW1lczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAgIFdlYmtpdFRyYW5zaXRpb246ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgICAgTW96VHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnXG4gICAgICB9O1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKHRyYW5zRW5kRXZlbnROYW1lcywgKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5nZXRTdHlsZShlbGVtZW50LCBrZXkpKSkge1xuICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25FbmQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uUHJlZml4ID0gbnVsbDtcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25FbmQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGdldFhIUigpOiBUeXBlIHsgcmV0dXJuIFhIUkltcGw7IH1cbiAgZ2V0RGlzdHJpYnV0ZWROb2RlcyhlbDogSFRNTEVsZW1lbnQpOiBOb2RlW10geyByZXR1cm4gKDxhbnk+ZWwpLmdldERpc3RyaWJ1dGVkTm9kZXMoKTsgfVxuICByZXNvbHZlQW5kU2V0SHJlZihlbDogSFRNTEFuY2hvckVsZW1lbnQsIGJhc2VVcmw6IHN0cmluZywgaHJlZjogc3RyaW5nKSB7XG4gICAgZWwuaHJlZiA9IGhyZWYgPT0gbnVsbCA/IGJhc2VVcmwgOiBiYXNlVXJsICsgJy8uLi8nICsgaHJlZjtcbiAgfVxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cbiAgc3VwcG9ydHNOYXRpdmVTaGFkb3dET00oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oKDxhbnk+dGhpcy5kZWZhdWx0RG9jKCkuYm9keSkuY3JlYXRlU2hhZG93Um9vdCk7XG4gIH1cbiAgZ2V0QW5pbWF0aW9uUHJlZml4KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9hbmltYXRpb25QcmVmaXgpID8gdGhpcy5fYW5pbWF0aW9uUHJlZml4IDogXCJcIjtcbiAgfVxuICBnZXRUcmFuc2l0aW9uRW5kKCk6IHN0cmluZyB7IHJldHVybiBpc1ByZXNlbnQodGhpcy5fdHJhbnNpdGlvbkVuZCkgPyB0aGlzLl90cmFuc2l0aW9uRW5kIDogXCJcIjsgfVxuICBzdXBwb3J0c0FuaW1hdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2FuaW1hdGlvblByZWZpeCkgJiYgaXNQcmVzZW50KHRoaXMuX3RyYW5zaXRpb25FbmQpO1xuICB9XG59XG4iXX0=