require "minitest/autorun"
require "./hom.rb"
require "./classes.rb"
class HomeworkTest < MiniTest::Test
  def setup
    @arr = [1,2,3,4,5,6]
    @even = ->(n) { n % 2 == 0 }
    @odd = proc { |n| n % 2 != 0}

    @eloquent_js = Book.new("Eloquent Javascript", ["Marijn Haverbeke"], 3)
    @speaking_js = Book.new("Speaking JavaScript", ["Dr. Axel Rauschmayer"], 1)
    @the_rust_lang = Book.new(
      "The Rust Programming Language",
      ["Steve Klabnik", "Carol Nichols"],
      2
    )
    @lib = Library.new
    @lib.shelve(@the_rust_lang)
    @lib.shelve(@eloquent_js)
    @lib.shelve(@speaking_js)
  end
  ## Test for hom
  def test_array_as_argument
    assert_raises ArgumentError do
      filter(100)
    end
  end
  def test_filter_even
    assert_equal(filter(@arr, &@even), [2, 4, 6])
  end
  def test_filter_odd
    assert_equal(filter(@arr, &@odd), [1, 3, 5])
  end
  def test_filter_greater_than_four
    assert_equal(filter(@arr) { |n| n > 4 }, [5, 6])
  end
  ## Tests for Classes
  def test_book_attributes
    assert(@eloquent_js.respond_to? :title)
    assert(@speaking_js.respond_to? :authors)
    assert(@the_rust_lang.respond_to? :edition)
  end
  def test_list
    assert_equal(3, @lib.list.length)
  end
  def test_find_by_title
    value1 = @lib.find_by_title("eloquent") 
    value2 = @lib.find_by_title("RUST") 
    assert_equal(@eloquent_js, value1)
    assert_equal(@the_rust_lang, value2)
  end
  def test_alphabetically_sorted
    assert_equal(@eloquent_js, @lib.list.first)
    assert_equal(@the_rust_lang, @lib.list.last)
  end
  def test_shelve
    before_count = @lib.list.length
    @lib.shelve(@eloquent_js)
    after_count = @lib.list.length
    assert_equal(before_count + 1, after_count)
    assert_includes(@lib.list, @eloquent_js)
  end
  def test_shelve_chainable
    value = @lib.shelve(@eloquent_js)
    assert_equal(@lib, value)
  end
end