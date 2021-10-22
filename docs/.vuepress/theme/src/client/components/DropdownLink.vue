<template>
  <div class="dropdown-wrapper" :class="{ open }">
    <button
      class="dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown"
    >
      <span class="title">{{ item.text }}</span>
      <span class="arrow down" />
    </button>

    <button
      class="mobile-dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="open = !open"
    >
      <span class="title">{{ item.text }}</span>
      <span class="arrow" :class="open ? 'down' : 'right'" />
    </button>

    <DropdownTransition>
      <ul v-show="open" class="nav-dropdown">
        <li
          v-for="(child, index) in item.children"
          :key="(child as NavLinkType).link || index"
          class="dropdown-item"
        >
          <template v-if="(child as NavGroup<NavItem>).children">
            <h4 class="dropdown-subtitle">
              <NavLink
                v-if="(child as NavLinkType).link"
                :item="(child as NavLinkType)"
                @focusout="
                  isLastItemOfArray(child, item.children) &&
                    (child as NavGroup<NavItem>).children.length === 0 &&
                    (open = false)
                "
              />

              <span v-else>{{ child.text }}</span>
            </h4>

            <ul class="dropdown-subitem-wrapper">
              <li
                v-for="grandchild in (child as NavGroup<NavItem>).children"
                :key="(grandchild as NavLinkType).link"
                class="dropdown-subitem"
              >
                <NavLink
                  :item="(grandchild as NavLinkType)"
                  @focusout="
                    isLastItemOfArray(grandchild, (child as NavGroup<NavItem>).children) &&
                      isLastItemOfArray(child, (item as NavGroup<NavItem>).children) &&
                      (open = false)
                  "
                />
              </li>
            </ul>
          </template>

          <template v-else>
            <NavLink
              :item="(child as NavLinkType)"
              @focusout="
                isLastItemOfArray(child, item.children) && (open = false)
              "
            />
          </template>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
import type { NavLink as NavLinkType, NavGroup, NavItem } from '../../shared'
import DropdownTransition from './DropdownTransition.vue'
import NavLink from './NavLink.vue'

const props = defineProps({
  item: {
    type: Object as PropType<NavGroup<NavItem>>,
    required: true,
  },
})

const { item } = toRefs(props)

const dropdownAriaLabel = computed(
  () => item.value.ariaLabel || item.value.text
)

const open = ref(false)
const route = useRoute()
watch(
  () => route.path,
  () => {
    open.value = false
  }
)

/**
 * Open the dropdown when user tab and click from keyboard.
 *
 * Use event.detail to detect tab and click from keyboard.
 * The Tab + Click is UIEvent > KeyboardEvent, so the detail is 0.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
 */
const handleDropdown = (e): void => {
  const isTriggerByTab = e.detail === 0
  if (isTriggerByTab) {
    open.value = !open.value
  } else {
    open.value = false
  }
}

const isLastItemOfArray = (item: unknown, arr: unknown[]): boolean =>
  arr[arr.length - 1] === item
</script>
